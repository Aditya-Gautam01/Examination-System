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
        <h1>HTML Topics</h1>

        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 1</span>
                <h2>HTML Basics</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('html-basic')">Start</button>
        </div>
 
        
        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 2</span>
                <h2>HTML Forms</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('html-form')">Start</button>
        </div>

       
        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 3</span>
                <h2>HTML Elements</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('html-elements')">Start</button>
        </div>
    </div>

    <script>
        function startQuiz(topic) {
            window.location.href = `${topic}_quiz.php`;
        }
    </script>
</body>
</html>
