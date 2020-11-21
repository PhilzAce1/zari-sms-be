export type emailtype = 'forgotpassword' | 'verifyemail';
export function mailtemp(data) {
	return `
  
  
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Document</title>
  <style>
    main {
      height: 100vh;
      width: 80%;
      margin:auto;
    }
    .header {
      height:10%;
      background: blue;
      width:100%;
      font-size:2rem;
      text-align:center;
      vertical-align: center;
      padding:5% 0;
    }
    .body {
      height: 70%; 
      background:white;
      padding: 20px;
    }
    p{
      font-size:1.3rem;
    }
  
  </style>
</head>
<body>
  <main> 
    <div class="header">From ${data.sender}</div>
    <div class="body">

    <p>Desitination Numbers: ${data.destinations}</p>
    <p>Message: ${data.message}</p>

    </div>
  </main>
</body>
</html>
  `;
}
