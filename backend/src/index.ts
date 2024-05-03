import app from './app.js'
import { connectToDatabase } from './db/connection.js'


// connections and listeners
connectToDatabase().then(() => {
    app.listen(process.env.PORT || 5000, () => console.log(`Server open ${process.env.PORT} & Connected to Database`))
})
.catch(err => console.log(err))
