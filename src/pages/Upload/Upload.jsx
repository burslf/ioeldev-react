import { Link } from 'react-router-dom';
import './upload.scss';

const Upload = () => {
    return (
        <div className='upload-ctnr'>
            <Link className="card" to={'/upload-song'}>
            <div >
                <h3 className='text-xl font-semibold'>Type Beat</h3>
            </div>
            </Link>
            <div className="card">
                <h3 className='text-xl font-semibold'>Drumkit</h3>
            </div>
        </div>
    )
}

export default Upload