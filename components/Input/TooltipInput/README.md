# tooltip Input Component

---

### Required attribute 
```angular2html
1. input blank check 
2. input blank tooltip message
3. disabled condition
4. input type ( ex; number | text ) ( *required )
5. RegExp pattern 
6. RegExp tooltip message
7. tag id ( *required )
8. front-label
9. back-label
```
---
## How to Use
1. load tooltipInput.js file
2. <tooltip-input></tooltip-input>

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>View</title>
    <style>
        .container{
            width : 110px;
            margin-top : 100px;
            margin-left : 500px;
        }
    </style>
</head>
<body>
<div class="container">
    <tooltip-input blank blankMessage="1~255사이의 값을 입력해주세요. (필수입력)" backLabel="뒷 라벨" frontLabel="앞 라벨" regExpMessage="1~255사이의 값만 입력가능합니다." regExp="^[1-9]$|^[1-9][0-9]$|^1[0-9][0-9]$|^2[0-4][0-9]$|^25[0-5]$" id="buzzer" type="text"></tooltip-input>
</div>
    <script src="components/Input/TooltipInput/tooltipInput.js"></script>
</body>
</html>

```






