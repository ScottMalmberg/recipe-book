import React from 'react';

const Layout = ({children}) => {
    return(
        <div>
            <header style={{
                width: "100%",
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
            <main style={{
                display: "flex",
                flexDirection: "column",
                margin: "1rem auto",
                maxWidth: "60%",
            }}>
                {children}
            </main>
        </div>
    )
    
}

export default Layout;