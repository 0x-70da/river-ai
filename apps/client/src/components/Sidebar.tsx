import { Plus } from "lucide-react";

export function Sidebar(){

    return(

        <aside
            className="
                w-72
                border-r
                flex
                flex-col
            "
        >

            <div className="p-4">

                <button
                    className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-2
                        rounded-lg
                        border
                        p-3
                    "
                >

                    <Plus size={18}/>

                    New Chat

                </button>

            </div>

            <div
                className="
                    flex-1
                    overflow-y-auto
                "
            >

            </div>

        </aside>

    );

}