<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Topics</title>
    <link rel="stylesheet" href="css/htmltopics.css">
</head>
<body>
    <div class="container">
        <h1>Python Topics</h1>

        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 1</span>
                <h2>Python syntax and basic structure</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('python-basic')">Start</button>
        </div>
        
        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 2</span>
                <h2>Control flow</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('python-controlflow')">Start</button>
        </div>

       
        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 3</span>
                <h2>Data Structures</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('python-ds')">Start</button>
        </div>
    </div>
 
    <script>
        function startQuiz(topic) {
            window.location.href = `${topic}_quiz.php`;
        }
    </script>
</body>
</html>