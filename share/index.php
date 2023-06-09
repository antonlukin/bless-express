<?php

namespace TigerSoda\BlessExpress;

use Exception;
use PDO;
use Dotenv;
use PosterEditor\PosterEditor;

if (php_sapi_name() === 'cli') {
//    exit;
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
    public $url = '/';

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
            $this->db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

            $this->db->query("CREATE TABLE IF NOT EXISTS users (name TEXT, number TEXT, lang TEXT, key TEXT, created TEXT)");
        } catch(Exception $e) {
           $this->send_json_error('Database connection error', 500);
        }

        return $this->db;
    }

    /**
     * Validate and handle new user
     */
    private function submit_data() {
        $data = json_decode(file_get_contents('php://input'), false);

        if (empty($data->message)) {
            $this->send_json_error('Text cannot be empty', 400);
        }

        $response = [
        ];

        $this->send_json_success($response);
    }

    /**
     * Get others sin list
     */
    private function get_list() {
        $db = $this->connect_database();

        try {
            $select = $db->query('SELECT name, number FROM users ORDER BY rowid DESC');
            $results = $select->fetchAll();
        } catch(Exception $e) {
           $this->send_json_error('Error occured while selecting standings from database', 500);
        }

        $this->send_json_success($results);
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

        if ('list' === $action) {
            return $this->get_list();
        }

//        $this->show_tags($action);
    }

    /**
     * Start with server request uri.
     *
     * @param string $request Request URI.
     */
    public function init($request) {
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv->load();

        if (isset($_ENV['REACT_APP_PROJECT_URL'])) {
            $this->url = $_ENV['REACT_APP_PROJECT_URL'];
        }

        $args = explode('/', trim($request, '/'));

        if (empty($args[1])) {
            $this->redirect_page($this->url);
        }

        $this->route_request($args[1]);
    }
}

(new Sharing)->init($_SERVER['REQUEST_URI']);

