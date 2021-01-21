const app = require('express')()
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';
app.use(bodyParser.json());
app.use('/api/v1/', routes);


// Connect to database and then listen to port
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})
    .then((result) => app.listen(
        process.env.PORT,
        () => console.log(`Server started on port : ${process.env.PORT}`)
    )
    )
    .catch((err) => console.log(err));


export default app;