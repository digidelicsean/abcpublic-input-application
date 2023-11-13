import { Link } from 'react-router-dom'
import ImageButton from './ImageButton';

function LinkImageButton({ to, preview, src, width, height, onClick, style, children, className}) {


    return (
        <Link to={to} className={className} style={{width: width ?? "", height: height ?? ""}}>
            <ImageButton preview={preview} src={src} width={width} height={height} onClick={onClick} style={style} />
            {children}
        </Link>
    )
}

export default LinkImageButton