export default function Profile() {


    const favoriteTags: string[] = [
        'baseball',
        'tolk',
        'cinema',
    ];

    return (
        <div className="w-full h-screen bg-yellow-50">
            <h2 className="pt-8 text-5xl text-center">username</h2>
            <div className='flex items-center justify-center ' >
                <img className="mt-8 w-72 h-72 rounded-full" src="https://avatars.githubusercontent.com/u/583231?v=4" />
            </div>
            <div className="pt-8 flex items-center justify-evenly">
                <p className='text-3xl' >follows</p>
                <p className='text-3xl' >followers</p>
            </div>
            <h2 className="pt-8 text-5xl text-center">趣味</h2>
            <div className='flex items-center justify-center ' >
                {favoriteTags.map((tag: string) => (
                    <p className='m-4 p-2 bg-gray-200 rounded-3xl text-xl' >{tag}</p>
                ))}
            </div>
        </div>
    );
}
