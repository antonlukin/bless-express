<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" sizes="32x32" href="https://efa.earth/icon-32.png"/>

    <title>EFA Admin Dashboard</title>

    <style>
        * {
            box-sizing: border-box;
        }


        html {
            font-size: 16px;
        }

        @media screen and (max-width: 767px) {
            html {
                font-size: 14px;
            }
        }

        body {
            display: flex;

            width: 80rem;
            max-width: 100%;

            margin: 0 auto;
            padding: 1rem;

            font: 400 1rem/1.375 -apple-system, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;

            color: #333;
            background-color: #eee;
        }

        @media screen and (max-width: 1023px) {
            body {
                flex-flow: column wrap; 
                padding: 0;
            }
        }

        section {
            display: block;
            flex: 1 1 auto;

            max-height: calc(100vh - 3rem);
            overflow: scroll;

            margin: 0.5rem;
            padding: 1rem;

            background: #fff;
            border-radius: 0.5rem;

        }

        section figure {
            display: grid;
            grid-template-columns: repeat(5, auto);
            gap: 1rem;

            width: 100%;
            margin: 0;
            font-size: 1rem;
        } 

        aside {
            display: block; 
            align-items: flex-start;

            flex: 0 0 24rem;

            margin: 0.5rem;
            padding: 1rem 1.5rem;
            font-size: 1rem;

            background: #fff;
            border-radius: 0.375rem;
        }

        @media screen and (max-width: 1023px) {
            aside {
                flex: 1 1 100%;
            }
        }

        aside figure {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;

            width: 100%;
            margin: 0;
        }

        aside figure strong {
            font-weight: 500;
        }

        aside figure span {
            text-align: right;
        }

        section p {
            display: flex;
            align-items: center;
            margin: 0;
        }

        section span, section a {
            display: block;
            margin: 0;
            max-width: 10rem;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        section a {
            color: #08c;
            text-decoration: none;
        }

        section button {
            display: block;
            cursor: pointer;

            padding: 0;
            margin: 0 auto;

            font: inherit;
            font-size: 0.875rem;

            color: #c00;
            background: transparent;

            border: 0;
        }

        h2 {
            margin: 0 0 1.25rem;
            font-size: 1.375rem;
        }
    </style>
</head>
<body>
    <aside>
        <h2>Summary</h2>

        <figure>
            <strong>Total users:</strong>
            <span><?php echo count($results); ?></span>

            <strong>EN locale:</strong>
            <span><?php echo $amount['en'] ?></span>

            <strong>ES locale:</strong>
            <span><?php echo $amount['es'] ?></span>
        </figure>
    </aside>

    <section>
        <h2>Users</h2>

        <figure>
            <?php foreach ($results as $result) : ?>
                <p data-id="<?php echo $result['rowid']; ?>">
                    <a href="/share/works/<?php echo $result['key']; ?>.png" target="_blank">
                        <?php echo $result['name']; ?>
                    </a>
                </p>

                <p data-id="<?php echo $result['rowid']; ?>">
                    <span><?php echo $result['number']; ?></span>
                </p>

                <p data-id="<?php echo $result['rowid']; ?>">
                    <span><?php echo $result['lang']; ?></span>
                </p>

                <p data-id="<?php echo $result['rowid']; ?>">
                    <span><?php echo $result['created']; ?></span>
                </p>

                <p data-id="<?php echo $result['rowid']; ?>">
                    <button>Delete</button>
                </p>
            <?php endforeach; ?>
        </figure>
    </section>

    <script>
        document.querySelectorAll('section button').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();

                const data = new FormData();
                data.append('delete', this.parentNode.dataset.id);

                const xhr = new XMLHttpRequest();
                xhr.open('POST', '/share/dashboard/', true);
                xhr.responseType = 'json';

                xhr.onload = function () {
                    var response = xhr.response;

                    if (!response.success)  {
                        return alert(response.data || 'Unexpected error');
                    }

                    document.querySelectorAll('section p[data-id="' + response.data + '"]').forEach(item => {
                        item.remove();
                    });
                };

                xhr.send(data);
            });
        });
    </script>
</body>
</html>
