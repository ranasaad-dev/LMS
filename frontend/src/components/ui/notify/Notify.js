import { toast } from 'react-toastify';

const notify = (prompt, type) =>  toast[type](prompt);
export default notify;