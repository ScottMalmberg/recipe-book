import React from 'react';

const Layout = ({children}) => {
    return(
        <div>
            <header className="container-fluid" style={{
                height: "10vh",
                backgroundColor: "#002e63",
                color: "white",
                textAlign: "center",
                padding: "1rem",
                fontSize: "2rem"
            }}>
                <h1 style={{
                    margin: "0",
                }}>Recipes</h1>
            </header>
            <main className="container my-4">
                {children}
            </main>
        </div>
    )
    
}

export default Layout;