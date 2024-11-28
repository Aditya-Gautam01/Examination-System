<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cprogramming Topics</title>
    <link rel="stylesheet" href="css/htmltopics.css">
</head>
<body>
    <div class="container">
        <h1>C Programming Topics</h1>

        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 1</span>
                <h2>Introduction to C Programming</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('c-intro')">Start</button>
        </div>
        
        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 2</span>
                <h2>Operators in C</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('c-operators')">Start</button>
        </div>

       
        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 3</span>
                <h2>Control Structures</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('c-structures')">Start</button>
        </div>
    </div>

    <script> 
        function startQuiz(topic) {
            window.location.href = `${topic}_quiz.php`;
        }
    </script>
</body>
</html>