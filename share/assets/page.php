<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="title" content="<?= $title; ?>">
    <meta name="description" content="<?= $description; ?>">

    <meta property="og:title" content="<?= $title; ?>">
    <meta property="og:description" content="<?= $description; ?>">
    <meta property="og:image" content="<?= $poster ?>">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="<?= $poster ?>">

    <title><?php echo $title; ?></title>
</head>
<body>
    <script type="text/javascript">
        window.location.href = '<?php echo $this->url ?>'
    </script>
</body>
</html>
