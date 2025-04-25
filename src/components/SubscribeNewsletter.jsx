function SubscribeNewsletter() {
    return(
        <section className="bg-white p-4 py-12 flex flex-col w-full items-center">
            <h1 className="text-[#0B3B5B] text-[36px] text-center font-extrabold py-4">Subscribe to our Newsletter</h1>
            <form action="" className="w-full flex flex-row justify-center items-center gap-2 flex-wrap">
                <input type="email" placeholder="Enter your Email" name="email-newsletter" className="p-2 rounded-lg border border-gray-500 w-[40%]"/>
                <button className="bg-[#0B3B5B] text-white p-2 rounded-lg font-semibold cursor-pointer">Subscribe</button>
            </form>
        </section>
    )
}

export default SubscribeNewsletter;