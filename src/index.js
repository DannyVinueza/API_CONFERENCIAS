import app from "./server.js";
import sequelize from "./database.js";

app.listen(app.get('port'), () => {
    console.log(`Server on port http://localhost:${app.get('port')}`)
})