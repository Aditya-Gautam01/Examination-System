<?php
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
    echo" connection successfull<br>";
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $full_name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirmPassword'];
    
    // Check if passwords match
    if ($password === $confirm_password) {
        // Hash the password for security
        $hashed_password = md5($password);

        // Prepare SQL statement to insert user into database
        $sql = "INSERT INTO user(fullname, email,password) VALUES ('$full_name','$email','$hashed_password')";
        // if ($conn->query($sql) === TRUE) {
        //     echo "<h2>New record inserted successfully<h2>";
        //   } else {
        //     echo "Error: " . $sql . "<br>" . $conn->error;
        //   }

         
    } else {
        echo "Passwords do not match!";
    }
    if ($conn->query($sql) === TRUE){                 // for page redirection
        header("location:http://localhost/EXAMSYSTEM/extend1.php");
        exit();
       }
      else{
        echo"Passwords do not match!";
      }
}
 
$conn->close();
?>
