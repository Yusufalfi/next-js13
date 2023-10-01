'use client' // useclient komponent ini client component bukan server komponent lagi 
import { useState, SyntheticEvent } from "react"
import { useRouter } from "next/navigation";

export default function addProduct() {

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [modal, setModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();


    const handleChange = () => {
        setModal(!modal)
    }

    const  handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        setLoading(true);
        await fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price,
            })
        });

        setLoading(false);
        setTitle("");
        setPrice("");
        router.refresh();
        setModal(false);
    }


  return (
    <div>
    
      <button className="btn" onClick={handleChange}>Add New</button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Product</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label className="label">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input w-full input-bordered" placeholder="product name" />
                </div>
                <div className="form-control">
                    <label className="label">Price</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="input w-full input-bordered" placeholder="product Price" />
                </div>
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {!isLoading ? (
                        <button type="submit" className="btn btn-primary">Save</button>
                    ): (
                        <button type="button" className="btn btn loading">Saving ....</button>
                    )}
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}
