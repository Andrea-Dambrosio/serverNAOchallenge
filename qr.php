<?php
$id = $_GET['id'];
$url = file_get_contents("./rl.txt");
$data = array('id' => $id);
$data_json = json_encode($data);

if (!filter_var($url, FILTER_VALIDATE_URL)) {
    $url = "https://nao-challenge-2024.loca.lt";
}

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $data_json);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($data_json),
    'bypass-tunnel-reminder: 1'
)
);

$result = curl_exec($ch);

// Decodifica la risposta JSON
$response_data = json_decode($result, true);

// Stampa la risposta
$response = $response_data;

curl_close($ch);
?>
<html>

<head>
    <title>Mozzarella di bufala</title>

    <script src="https://kit.fontawesome.com/2ec84c4ab2.js" crossorigin="anonymous"></script>
    <style>
        @import url('https://fonts.cdnfonts.com/css/grange');
        @import url('https://fonts.googleapis.com/css2?family=Cute+Font&display=swap');

        .immagine {
            position: absolute;
            top: calc(50% - 275px);
            left: calc(50% - 275px);
            width: 550px;
            height: auto;
            animation: fluttua 2.3s ease-in-out alternate infinite;
        }

        .titolo {
            line-height: 57%;
            font-family: 'Cute Font', sans-serif;
            position: absolute;
            bottom: 307px;
            color: white;
            font-size: 166px;
            width: 100%;
            text-align: center;
        }

        @keyframes fluttua {
            from {
                transform: translateY(0%);
            }

            to {
                transform: translateY(-60%);
            }
        }

        .area {
            background: #000000;
            ;
            width: 100%;
            height: 100vh;
        }

        @keyframes sfondo {
            0% {
                background-position: 0% 50%
            }

            50% {
                background-position: 100% 50%
            }

            100% {
                background-position: 0% 50%
            }
        }

        .circles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            margin: 0px;
            padding: 0px;
        }

        .circles li {
            position: absolute;
            display: block;
            list-style: none;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.2);
            animation: animate 25s linear infinite;
            bottom: -150px;
        }

        .circles svg {
            position: absolute;
            display: block;
            list-style: none;
            width: 20px;
            height: 20px;
            animation: animate 10s linear infinite;
            animation-delay: 2s;
            bottom: -200px;
            color: rgb(12 51 255 / 75%)
        }

        .circles li:nth-child(1) {
            left: 25%;
            width: 80px;
            height: 80px;
            animation-delay: 0s;
        }


        .circles li:nth-child(2) {
            left: 10%;
            width: 20px;
            height: 20px;
            animation-delay: 2s;
            animation-duration: 12s;
        }

        .circles li:nth-child(3) {
            left: 70%;
            width: 20px;
            height: 20px;
            animation-delay: 4s;
        }

        .circles li:nth-child(4) {
            left: 40%;
            width: 60px;
            height: 60px;
            animation-delay: 0s;
            animation-duration: 18s;
        }

        .circles li:nth-child(5) {
            left: 65%;
            width: 20px;
            height: 20px;
            animation-delay: 0s;
        }

        .circles li:nth-child(6) {
            left: 75%;
            width: 110px;
            height: 110px;
            animation-delay: 3s;
        }

        .circles li:nth-child(7) {
            left: 35%;
            width: 150px;
            height: 150px;
            animation-delay: 7s;
        }

        .circles li:nth-child(8) {
            left: 50%;
            width: 25px;
            height: 25px;
            animation-delay: 15s;
            animation-duration: 45s;
        }

        .circles li:nth-child(9) {
            left: 20%;
            width: 15px;
            height: 15px;
            animation-delay: 2s;
            animation-duration: 35s;
        }

        .circles li:nth-child(10) {
            left: 85%;
            width: 150px;
            height: 150px;
            animation-delay: 0s;
            animation-duration: 11s;
        }


        .circles svg:nth-child(11) {
            animation-delay: -2s;
            animation-duration: 10s;
        }

        .circles svg:nth-child(12) {
            animation-delay: 4s;
            animation-duration: 8s;
        }

        .circles svg:nth-child(13) {
            animation-delay: 2s;
            animation-duration: 12s;
        }

        .circles svg:nth-child(14) {
            animation-delay: 0s;
            animation-duration: 6s;
        }

        i {
            display: none;
        }

        body {
            overflow: hidden;
        }

        @keyframes animate {

            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
                border-radius: 0;
            }

            100% {
                transform: translateY(-1100px) rotate(720deg);
                opacity: 0.2;
                border-radius: 70%;
            }

        }

        body {
            margin: 0px;
        }
    </style>
    <script>
        document.addEventListener("DOMContentLoaded", function () {

            loading.addEventListener("animationend", () => {
                loading.remove()
            });

        });
        window.onload = () => {
            let elements = document.querySelectorAll("svg");
            ciclo();
            function ciclo() {
                if (elements.length === 0) {
                    elements = document.querySelectorAll("svg");
                    setTimeout(ciclo, 500);
                }
                elements.forEach((element) => {
                    setProperties(element);
                    element.addEventListener("animationiteration", () => {
                        setProperties(element);
                    });
                });
            }
            function casuale(min, max) {
                const casualt = Math.random() * (max - min) + min;
                return casualt;
            }
            function setProperties(element) {
                element.style.left = casuale(5, 90) + "%";
                element.style.width = casuale(55, 230) + "px";
                element.style.height = element.style.width;
            }
        }

    </script>
    <style>
        .animation {
            animation-delay: 5.5s;
            animation: clipPath 1.5s ease-in-out;
            animation-fill-mode: forwards;
        }

        @keyframes clipPath {
            from {
                clip-path: circle(100vh)
            }

            to {
                clip-path: circle(0px);
            }
        }
    </style>
</head>
<div class="area">
    <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <svg class="svg-inline--fa fa-cow" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cow"
            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""
            style="left: 26.2493%; width: 66.794px; height: 66.794px;">
            <path fill="currentColor"
                d="M96 224v32V416c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V327.8c9.9 6.6 20.6 12 32 16.1V368c0 8.8 7.2 16 16 16s16-7.2 16-16V351.1c5.3 .6 10.6 .9 16 .9s10.7-.3 16-.9V368c0 8.8 7.2 16 16 16s16-7.2 16-16V343.8c11.4-4 22.1-9.4 32-16.1V416c0 17.7 14.3 32 32 32h32c17.7 0 32-14.3 32-32V256l32 32v49.5c0 9.5 2.8 18.7 8.1 26.6L530 427c8.8 13.1 23.5 21 39.3 21c22.5 0 41.9-15.9 46.3-38l20.3-101.6c2.6-13-.3-26.5-8-37.3l-3.9-5.5V184c0-13.3-10.7-24-24-24s-24 10.7-24 24v14.4l-52.9-74.1C496 86.5 452.4 64 405.9 64H272 256 192 144C77.7 64 24 117.7 24 184v54C9.4 249.8 0 267.8 0 288v17.6c0 8 6.4 14.4 14.4 14.4C46.2 320 72 294.2 72 262.4V256 224 184c0-24.3 12.1-45.8 30.5-58.9C98.3 135.9 96 147.7 96 160v64zM560 336a16 16 0 1 1 32 0 16 16 0 1 1 -32 0zM166.6 166.6c-4.2-4.2-6.6-10-6.6-16c0-12.5 10.1-22.6 22.6-22.6H361.4c12.5 0 22.6 10.1 22.6 22.6c0 6-2.4 11.8-6.6 16l-23.4 23.4C332.2 211.8 302.7 224 272 224s-60.2-12.2-81.9-33.9l-23.4-23.4z">
            </path>
        </svg>
        <svg class="svg-inline--fa fa-cheese" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="cheese"
            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""
            style="left: 87.9672%; width: 156.028px; height: 156.028px;">
            <path fill="currentColor"
                d="M512 240.2V256H0c0-20 10-38.7 26.6-49.8L274.9 40.7c8.6-5.7 18.6-8.7 28.9-8.7C418.8 32 512 125.2 512 240.2zm0 47.8V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V288H512z">
            </path>
        </svg>
        <svg class="svg-inline--fa fa-robot" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="robot"
            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""
            style="left: 7.50114%; width: 149.075px; height: 149.075px;">
            <path fill="currentColor"
                d="M320 0c17.7 0 32 14.3 32 32V96H472c39.8 0 72 32.2 72 72V440c0 39.8-32.2 72-72 72H168c-39.8 0-72-32.2-72-72V168c0-39.8 32.2-72 72-72H288V32c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H208zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H304zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16h32c8.8 0 16-7.2 16-16s-7.2-16-16-16H400zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224H64V416H48c-26.5 0-48-21.5-48-48V272c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v96c0 26.5-21.5 48-48 48H576V224h16z">
            </path>
        </svg>
        <svg class="svg-inline--fa fa-leaf" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="leaf"
            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""
            style="left: 68.0334%; width: 121.32px; height: 121.32px;">
            <path fill="currentColor"
                d="M272 96c-78.6 0-145.1 51.5-167.7 122.5c33.6-17 71.5-26.5 111.7-26.5h88c8.8 0 16 7.2 16 16s-7.2 16-16 16H288 216s0 0 0 0c-16.6 0-32.7 1.9-48.3 5.4c-25.9 5.9-49.9 16.4-71.4 30.7c0 0 0 0 0 0C38.3 298.8 0 364.9 0 440v16c0 13.3 10.7 24 24 24s24-10.7 24-24V440c0-48.7 20.7-92.5 53.8-123.2C121.6 392.3 190.3 448 272 448l1 0c132.1-.7 239-130.9 239-291.4c0-42.6-7.5-83.1-21.1-119.6c-2.6-6.9-12.7-6.6-16.2-.1C455.9 72.1 418.7 96 376 96L272 96z">
            </path>
        </svg>
        <svg class="svg-inline--fa fa-tree" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="tree"
            role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""
            style="left: 41.5315%; width: 182.953px; height: 182.953px;">
            <path fill="currentColor"
                d="M210.6 5.9L62 169.4c-3.9 4.2-6 9.8-6 15.5C56 197.7 66.3 208 79.1 208H104L30.6 281.4c-4.2 4.2-6.6 10-6.6 16C24 309.9 34.1 320 46.6 320H80L5.4 409.5C1.9 413.7 0 419 0 424.5c0 13 10.5 23.5 23.5 23.5H192v32c0 17.7 14.3 32 32 32s32-14.3 32-32V448H424.5c13 0 23.5-10.5 23.5-23.5c0-5.5-1.9-10.8-5.4-15L368 320h33.4c12.5 0 22.6-10.1 22.6-22.6c0-6-2.4-11.8-6.6-16L344 208h24.9c12.7 0 23.1-10.3 23.1-23.1c0-5.7-2.1-11.3-6-15.5L237.4 5.9C234 2.1 229.1 0 224 0s-10 2.1-13.4 5.9z">
            </path>
        </svg>
    </ul>
</div>
<!-- <?php 
$id = $_GET['id'];
switch($id){
    case 1:
        echo "<h1 class='titolo'>Mozzarella di Bufala</h1>";
        echo "<img src='image 7.png' class='immagine'>";
        break;
    case 2:
        echo "<h1 class='titolo'>Pomodoro San Marzano</h1>";
        echo "<img src='image 8.png' class='immagine'>";
        break;
}
?> -->
<h1 class="titolo">Mozzarella di Bufala</h1>
<img src="image 7.png" class="immagine">
</div>

<div id="loading" class="animation" style="
height: 100vh;
width: 100vw;
z-index: 5000;
position:absolute;
top: 0;
bottom: 0;
background: url('logo_nao_challenge.png') no-repeat center white;
background-size: 50vw
">


</html>