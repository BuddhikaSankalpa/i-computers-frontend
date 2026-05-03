export default function ProductCard(props){

    console.log("Product card rendered")
    console.log("Product card rendered successfully")

    return(
        <div className="border w-56 h-60 rounded-2xl">
            <h1>{props.name}</h1>
            <img src={props.photo} className="w-40 h-40"/>
            <p>Rs. {props.price}</p>
        </div>
    )

}