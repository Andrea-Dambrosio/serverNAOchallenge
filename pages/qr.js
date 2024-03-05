
export default function Page(props) {
    return (<h1> ID Inviato {props.id} </h1>);
}

export async function getServerSideProps(context) {
    const id = context.query.id;

    const res = await fetch(`http://127.0.0.1:8000/api/informazioni`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
    });

    if (!res.ok) {
        console.error('Failed to fetch data');
    }

    return {
        props: { id },
    };
}