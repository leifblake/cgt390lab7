<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';

// Get form data
$name = isset($_POST['name']) ? $_POST['name'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$title = isset($_POST['title']) ? $_POST['title'] : '';
$bio = isset($_POST['bio']) ? $_POST['bio'] : '';

// Prepare and execute SQL
$stmt = $conn->prepare("INSERT INTO user_profiles (name, email, title, bio) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $email, $title, $bio);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Profile saved successfully.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error saving the data.']);
}

$stmt->close();
$conn->close();
?>