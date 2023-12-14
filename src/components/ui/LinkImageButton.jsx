import { Link } from 'react-router-dom'
import ImageButton from './ImageButton';

function LinkImageButton({ to, src, width, height, onClick, style, children, className}) {


    return (
        <Link to={to} className={className} style={{width: width ?? "", height: height ?? ""}} draggable={false}>
            <ImageButton preview={false} src={src} width={width} height={height} onClick={onClick} style={style} />
            {children}
        </Link>
    )
}

export default LinkImageButton