import './skeleton.css';

type props = {
    width: number | string,
    height: number | string,
    borderRadius?: number
}



export default function Skeleton({ width, height, borderRadius  }: props){

    return(
        <div className="container" style={{width, height, borderRadius}} /> 
    )

}