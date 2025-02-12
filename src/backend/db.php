<?php
$servername = "mydb.ics.purdue.edu";
$username = "blake50";  // Your Purdue username
$password = "Mutant2003!";  // Your database password
$dbname = "Mutant2003!";    // Your database name (usually same as username)

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>