'use client' // useclient komponent ini client component bukan server komponent lagi 
import { useState } from "react"
import { useRouter } from "next/navigation";

type Product = {
    id: number;
    title: string;
    price: number;
}

export default function deleteProduct(product: Product) {


    const [modal, setModal] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const router = useRouter();


    const handleChange = () => {
        setModal(!modal)
    }

    const  handleDelete = async (productId: number) => {
        setLoading(true);
        await fetch(`http://localhost:5000/products/${productId}`, {
            method: 'DELETE',
        });

        setLoading(false);
        router.refresh();
        setModal(false);
    }


  return (
    <div>
    
      <button className="btn btn-error btn-sm" onClick={handleChange}>Delete</button>
      <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle" />

      <div className="modal">
        <div className="modal-box">
            <h3 className="font-bold text-lg">Sure To delete this data {product.title} ? </h3>
  
          
                <div className="modal-action">
                    <button type="button" className="btn" onClick={handleChange}>Close</button>
                    {!isLoading ? (
                        <button type="button" onClick={() => handleDelete(product.id)} className="btn btn-primary">Delete</button>
                    ): (
                        <button type="button" className="btn btn loading">Deleting ....</button>
                    )}
                </div>
        
        </div>
      </div>
    </div>
  )
}
