import { createClient } from "@supabase/supabase-js";

const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const url = import.meta.env.VITE_SUPABASE_URL;

const supabase = createClient(url, key);

export default function uploadMedia(file) {
	return new Promise((resolve, reject) => {
		if (file == null) {
			reject("No file provided");
		} else {
			const timestamp = new Date().getTime();

			const fileName = timestamp + "_" + file.name;

			supabase.storage
				.from("images")
				.upload(fileName, file)
				.then(() => {
					const publicUrl = supabase.storage
						.from("images")
						.getPublicUrl(fileName).data.publicUrl;
					
                    resolve(publicUrl);
				}).catch((error) => {
                    reject(error);
                });
		}
	});
}
