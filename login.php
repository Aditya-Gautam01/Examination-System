<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "examsystem";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    echo "connection successfull\n";
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $hashed_password = md5($password);
    // Prepare SQL statement to fetch user with the provided email
    $sql = "SELECT * FROM user where email='$email'";
    $result = $conn -> query($sql);

    // Associative array
    $row = $result -> fetch_assoc();
    $pass=$row["password"];
    $name=$row["fullname"];
    
    //  if($pass== $hashed_password){
    //     echo "hello $name you are successfully loggedin";
    //  }else{
    //     echo "Error: " . $sql . "<br>" . $conn->error;
    //  }   
    if ($pass== $hashed_password){
        //You need to redirect
        header("location:http://localhost/EXAMSYSTEM/home.php");
        exit();
       }
      else{
        echo"error";
      }
   

    $result -> free_result();
   
} 
$conn->close();

?>
