<?php
$id = $_GET['id'];

$data = array('id' => $id);
$data_json = json_encode($data);

$ch = curl_init('https://nao-challenge-2024.loca.lt');
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

