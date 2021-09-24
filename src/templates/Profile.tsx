export default function Profile() {
    return (
        <div className="w-full h-screen">
            <image path={''} />

            <h2 className="pt-8 text-xl text-center">username</h2>
            <div className="pt-8 flex items-center justify-center">
                <p>follows</p>
                <p>followers</p>
            </div>
        </div>
    );
}
