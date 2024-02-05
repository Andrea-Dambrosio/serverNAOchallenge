<?php
function mozzarella(){
    echo <<<HTML
    <h1>QR Code</h1>
HTML;
}
$id = $_GET['id'];
$url = file_get_contents("./rl.txt");
$data = array('id' => $id);
$data_json = json_encode($data);

if(!filter_var($url, FILTER_VALIDATE_URL)){
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
));

$result = curl_exec($ch);

// Decodifica la risposta JSON
$response_data = json_decode($result, true);

// Stampa la risposta
$response =  $response_data;

curl_close($ch);
echo <<<HTML
    <h1>Code: $response</h1>
HTML;


