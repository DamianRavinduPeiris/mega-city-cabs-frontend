export default function LoadingSpinner() {
    return (
        <div>
            <div className="flex justify-center items-center h-full">
                <div
                    style={{
                        width: '128px',
                        height: '16px',
                        backgroundColor: '#e2e8f0',
                        borderRadius: '9999px',
                        position: 'relative',
                        overflow: 'hidden',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '25%',
                            height: '100%',
                            backgroundColor: '#000',
                            animation: 'slide 2s infinite linear',
                        }}
                    ></div>
                </div>
            </div>

            <style>
                {`
    @keyframes slide {
      0% {
        transform: translateX(-100%);
      }
      50% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `}
            </style>


        </div>
    )
}
