export default function ZumNavigator(){
    return(
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '2rem'}}>
                            <button style={{
                                padding: '0.5rem',
                                backgroundColor: 'var(--red-primary)',
                                color: 'white',
                                borderRadius: '1.5rem',
                                fontFamily: 'var(--font-berlin-type-bold)',
                                fontSize: '1.2rem'
                            }} className="w-full">
                                Zum Navigator
                            </button>
                        </div>
    );
}