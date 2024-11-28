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
        <h1>CSS Topics</h1>

        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 1</span>
                <h2>CSS Basics</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('css-basic')">Start</button>
        </div>

         
        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 2</span>
                <h2>CSS Layout</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('css-layout')">Start</button>
        </div>

       
        <div class="topic">
            <div class="topic-info">
                <span class="set-label">Set 3</span>
                <h2>CSS Flexbox</h2>
            </div>
            <button class="start-btn" onclick="startQuiz('css-flexbox')">Start</button>
        </div>
    </div>

    <script>
        function startQuiz(topic) {
            window.location.href = `${topic}_quiz.php`;
        }
    </script>
</body>
</html>