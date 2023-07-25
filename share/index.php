<?php

namespace TigerSoda\BlessExpress;

use Exception;
use PDO;
use Dotenv;
use PosterEditor\PosterEditor;

if (php_sapi_name() === 'cli') {
    exit;
}

require_once __DIR__ . '/vendor/autoload.php';

/**
 * Save result to database and show sharing posters
 *
 * @author  Anton Lukin
 * @version 1.0
 * @license MIT License
 */
final class Sharing
{
    /**
     * Url to project home page.
     */
    public $url = null;

    /**
     * Current file directory.
     */
    public $dir = __DIR__;

    /**
     * SQLite storage instance.
     */
    private $db = null;

    /**
     * Redirect page to desired location;
     *
     * @param string $location New page location.
     * @param int    $status   HTTP header status. By default: 301.
     */
    private function redirect_page($location, $status = 301) {
        header("Location: {$location}", true, $status);
        exit;
    }

    /**
     * Generate unique poster name.
     */
    private function get_unique_key() {
        return sha1(uniqid('', true));
    }

    /**
     * Send JSON and exit.
     *
     * @param int   $status HTTP status code.
     * @param array $output Data to response.
     */
    private function send_json($output, $status) {
        http_response_code($status);

        header('Content-Type: application/json');
        echo json_encode($output);

        exit;
    }

    /**
     * Send JSON width error message.
     *
     * @param mixed $data   Error data.
     * @param int   $status HTTP status code. By default: 500.
     */
    private function send_json_error($data, $status = 500) {
        $output = array(
            'success' => false,
            'data'    => $data,
        );

        return $this->send_json($output, $status);
    }

    /**
      * Send JSON with success message.
     *
     * @param mixed $data   Success data.
     * @param int   $status HTTP status code. By default: 500.
     */
    private function send_json_success($data = null) {
        $output = array(
            'success' => true,
            'data'    => $data,
        );

        return $this->send_json($output, 200);
    }

    /**
     * Create SQLite instance.
     */
    private function connect_database() {
        if ($this->db !== null) {
            return $this->db;
        }

        try {
            $this->db = new PDO('sqlite://' . __DIR__ . '/database/users.db');

            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

            $this->db->query('CREATE TABLE IF NOT EXISTS "users" (
                "key" text NOT NULL,
                "message" text NOT NULL,
                "email" text NULL,
                "name" text NULL,
                "sent" integer NOT NULL DEFAULT "0",
                "blocked" integer NOT NULL DEFAULT "0",
                "created" text NULL
            )');
        } catch(Exception $e) {
           $this->send_json_error('Database connection error', 500);
        }

        return $this->db;
    }

    /**
     * Check if this message has bad words
     * Honestly this functions is useless
     *
     * @param string $message User's message from request
     */
    private function check_blocked($message) {
        $message = strtolower($message);

        if (!file_exists(__DIR__ . '/stopwords.csv')) {
            return 0;
        }

        $words = str_getcsv(file_get_contents(__DIR__ . '/stopwords.csv'), ',');

        foreach ($words as $word) {
            $pos = mb_strpos($message, $word);

            if ($pos === false) {
                continue;
            }

            if ($pos === 0 || $message[$pos - 1] === ' ') {
                return 1;
            }
        }

        return 0;
    }

    /**
     * Insert new user
     *
     * @param object $data User's data from request.
     */
    private function insert_user($data) {
        $db = $this->connect_database();

        // Get current datetime
        $created = date('Y-m-d H:i:s');

        // Check if this message has bad words
        $blocked = $this->check_blocked($data->message);

        try {
            $insert = $db->prepare('INSERT INTO users (key, message, email, name, blocked, created) VALUES (?, ?, ?, ?, ?, ?)');
            $insert->execute(array($data->key, $data->message, $data->email, $data->name, $blocked, $created));
        } catch(Exception $e) {
            // Not inserted? No problem
        }
    }

    /**
     * Get non blocked users from database
     */
    private function get_users() {
        $db = $this->connect_database();

        try {
            $select = $db->query('SELECT rowid AS id, message, name FROM users WHERE blocked = 0 ORDER BY rowid DESC LIMIT 50');
            $results = $select->fetchAll();
        } catch(Exception $e) {
           $this->send_json_error('Error occured while selecting standings from database', 500);
        }

        foreach ($results as $result) {
            $name = $result->id % 43;
            $result->image = "/others/{$name}.jpg";
        }

        return $results;
    }

    /**
     * Get anonymous poster
     *
     * @param object $data User's data from request.
     */
    private function get_anonymous_poster($data) {
        $data->story = $this->url . '/share/anonymous/story.png';
        $data->link = $this->url . '/share/';

        return $data;
    }

    /**
     * Upload and generate posters from JSON data
     *
     * @param object $data User's data from request.
     */
    private function create_posters($data) {
        if (!empty($data->anonym)) {
            return $this->get_anonymous_poster($data);
        }

        try {
            $story = new PosterEditor();
            $story->make(__DIR__ . '/assets/story.png');

            $story->text($data->message, array(
                'x' => 136,
                'y' => 1400,
                'width' => 810,
                'height' => 300,
                'fontpath'   => $this->dir . '/assets/inter.ttf',
                'fontsize'   => 32,
                'lineheight' => 1.75,
                'horizontal' => 'center',
                'color'      => '#ffffff',
            ));

            $story->save($this->dir . "/posters/story-{$data->key}.jpg", 80);

            $poster = new PosterEditor();
            $poster->make(__DIR__ . '/assets/poster.png');

            $poster->text($data->message, array(
                'x' => 58,
                'y' => 100,
                'width' => 290,
                'height' => 420,
                'fontpath'   => $this->dir . '/assets/inter.ttf',
                'fontsize'   => 16,
                'lineheight' => 1.75,
                'horizontal' => 'left',
                'color'      => '#ffffff',
            ));

            $poster->save($this->dir . "/posters/poster-{$data->key}.jpg", 80);
        } catch(Exception $e) {
            $this->send_json_error('Failed to save poster');
        }

        $data->story = $this->url . "/share/posters/story-{$data->key}.jpg";
        $data->link = $this->url . "/share/{$data->key}";

        return $data;
    }

    /**
     * Validate and handle new user
     */
    private function submit_data() {
        $data = json_decode(file_get_contents('php://input'), false);

        if (empty($data->message)) {
            $this->send_json_error('Text cannot be empty', 400);
        }

        $data->message = strip_tags($data->message);

        if (mb_strlen($data->message) > 300) {
            $data->message = mb_substr($data->message, 0, 300) . "...";
        }

        if (!empty($data->anonym) || empty($data->name)) {
            $data->name = 'Anonymous';
        }

        $data->name = strip_tags($data->name);

        if (mb_strlen($data->name) > 100) {
            $data->name = mb_substr($data->name, 0, 100) . "...";
        }

        $data->key = $this->get_unique_key();

        $this->insert_user($data);
        $this->create_posters($data);

        // Get a list of users
        $data->users = $this->get_users();

        $this->send_json_success($data);
    }

    /**
     * Show anonymous template
     *
     * @param string $name Poster name.
     */
    private function show_anonymous() {
        $meta = array(
            'poster'      => $this->url . '/share/anonymous/poster.png',
            'title'       => 'Guilt-Free and Loving It!',
            'description' => 'Just received my indulgence. Ready to get yours?',
        );

        extract($meta);

        include_once __DIR__ . '/assets/page.php';
    }

    /**
     * Show tags template.
     *
     * @param string $name Poster name.
     */
    private function show_tags($name) {
        if (empty($name)) {
            return $this->show_anonymous();
        }

        if (!file_exists($this->dir . "/posters/poster-{$name}.jpg")) {
            return $this->redirect_page($this->url);
        }

        $meta = array(
            'poster'      => $this->url . "/share/posters/poster-{$name}.jpg",
            'title'       => 'Guilt-Free and Loving It!',
            'description' => 'Just received my indulgence. Ready to get yours?',
        );

        extract($meta);

        include_once __DIR__ . '/assets/page.php';
    }

    /**
     * Routing an incoming request.
     *
     * @param string $action Request control parameter.
     */
    private function route_request($action) {
        if ('submit' === $action) {
            return $this->submit_data();
        }

        $this->show_tags($action);
    }

    /**
     * Start with server request uri.
     *
     * @param string $request Request URI.
     */
    public function init($request) {
        $dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__), '.env.local');
        $dotenv->load();

        $this->url = rtrim($_ENV['SITE_URL'], '/');

        // Parse request args
        $args = explode('/', trim($request, '/'));

        $this->route_request($args[1]);
    }
}

(new Sharing)->init($_SERVER['REQUEST_URI']);

