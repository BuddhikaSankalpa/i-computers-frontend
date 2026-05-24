export default function LoadingScreen(){
    return(
        /* FIXED: inset-0 and high z-index to center perfectly over the whole screen */
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/70 backdrop-blur-md m-0 p-0">
            
            {/* Glowing Multi-Ring Spinner */}
            <div className="relative w-24 h-24 flex justify-center items-center mb-6">
                {/* Outer Blue Ring */}
                <div className="absolute w-full h-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                
                {/* Middle Purple Ring (Spins in reverse) */}
                <div className="absolute w-20 h-20 border-4 border-r-purple-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                
                {/* Inner Emerald Ring */}
                <div className="absolute w-16 h-16 border-4 border-b-emerald-400 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            </div>

            {/* Glowing Loading Text */}
            <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-400 font-bold tracking-[0.3em] animate-pulse">
                LOADING...
            </div>
            
        </div>
    )
}