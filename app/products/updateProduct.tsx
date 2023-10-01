'use client' // useclient komponent ini client component bukan server komponent lagi 
import { useState, SyntheticEvent } from "react"
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
}

export default function updateProduct(product: Product) {

    const [title, setTitle] = useState(product.title);
    const [price, setPrice] = useState(product.price);
    const [modal, setModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();


    const handleChange = () => {
        setModal(!modal)
    }

    const  handleUpdate = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch(`http://localhost:5000/products/${product.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price,
            })
        });

        setLoading(false);

        router.refresh();
        setModal(false);
    }


  return (
    <div>
    
      <button className="btn btn-info btn-sm" onClick={handleChange}>Edit</button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>
            <form onSubmit={handleUpdate}>
                <div className="form-control">
                    <label className="label">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="product name" />
                </div>
                <div className="form-control">
                    <label className="label">Price</label>
                    <input type="text" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="input w-full input-bordered" placeholder="product Price" />
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {!isLoading ? (
                        <button type="submit" className="btn btn-primary">Update</button>
                    ): (
                        <button type="button" className="btn btn loading">Updating ....</button>
                    )}
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}
