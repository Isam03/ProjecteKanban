<?php

    $data_expiracio = 3600 * 24 * 365;
    
    setcookie("idiom","cat",time() + $data_expiracio);
    $resultat = isset($_COOKIE['idiom']) ? $_COOKIE['idiom'] : null;

    if (isset($_POST['enviar']))
    {
        if(isset($_POST['idioma'])){
            $lang = $_POST['idioma'];
            setcookie("idiom",$lang,time() + $data_expiracio);
            $resultat = $_COOKIE['idiom'];
            header('Location: ' . $_SERVER['REQUEST_URI']);
            exit;

        }
        
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
    <title>Cookies</title>
</head>
<body>
    <div class="container">
        <h2 style="font-family: alkalami, verdana; font-style: bold;">Cookies</h2>
    </div>
    <div class="container">
        <div class="card">
            <div class="card-body">
            <form class="row g-3" method="POST">
                <div class="input-group mb-3">
                    <label class="input-group-text" for="inputGroupSelect01">
                        <?php if(empty($resultat) or ($resultat == "cat")): ?><?php echo "Escull idioma" ?><?php endif; ?>
                        <?php if($resultat == "es"): ?><?php echo "Elige idioma" ?><?php endif; ?>
                        <?php if($resultat == "eng"): ?><?php echo "Choose language" ?><?php endif; ?>
                    </label>
                    <select name="idioma" class="form-select" id="inputGroupSelect01">
                        <option value="cat" <?php if(empty($resultat) or ($resultat == "cat")): ?> selected <?php endif; ?>>Català</option>
                        <option value="es" <?php if($resultat == "es"): ?> selected <?php endif; ?>>Castellà</option>
                        <option value="eng" <?php if($resultat == "eng"): ?> selected <?php endif; ?>>English</option>
                    </select>
                    <button class="btn btn-outline-secondary" name="enviar" type="submit">
                        <?php if(empty($resultat) or ($resultat == "cat")): ?><?php echo "Canviar" ?><?php endif; ?>
                        <?php if($resultat == "es"): ?><?php echo "Cambiar" ?><?php endif; ?>
                        <?php if($resultat == "eng"): ?><?php echo "Change" ?><?php endif; ?>
                    </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</body>
</html>