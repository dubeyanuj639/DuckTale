import express from 'express';
import * as user from "./controller/student";
const app = express();

app.post('/', user.add);
app.get('/', user.get);
app.put('/:student_id', user.update);
app.delete('/:student_id', user.remove);

export default app;
