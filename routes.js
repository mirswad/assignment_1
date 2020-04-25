const handler = (req, res) => {


const url = req.url;
  const method = req.method;
      
      if(url === '/') 
      {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>User Registration</title></head>');
        res.write('<body><form name="resgiter" action="/create-user" method="POST"><input type="text" name="username"> <button type ="submit">Register</button></form> </body>')
        res.write('</html>');
      }

      if(url === '/users') 
      {
             res.setHeader('Content-Type', 'text/html');
             res.write('<html><head><title>Assignment 1</title></head>');
             res.write('<body><h3>Users</h3><ul><li>Bistami</li><li>Fejo Sre</li><li>Brian Tracy</li></ul></body>');
             res.write('</html>');
      }

      if(url === '/create-user' && method === 'POST')
        {
         const user_name = [];
         req.on('data', (chunk) => {
          user_name.push(chunk);
          console.log(user_name);
         });

          req.on('end', () => {
         const parse = Buffer.concat(user_name).toString();
         const message = parse.split('=')[1];
         console.log(message);        
         });
        res.statusCode = 302;
        res.setHeader('Location', '/users');
         res.end();
             
        }
        res.end();    

    } 
    module.exports = handler;       