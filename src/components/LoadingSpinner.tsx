interface LoadSpinnerProps {
    size: string
}

export function LoadingSpinner({size}:LoadSpinnerProps){
    return (
        <div 
              className={`${size} border-4 border-l-gray-300 border-r-gray-300 border-b-gray-300 border-t-green-500 animate-spin ease-linear rounded-full`}
        />   
    )
}