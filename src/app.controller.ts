import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import * as textToImage from "text-to-image";
import * as fs from "fs";

@Controller("app")
export class AppController
{
	constructor(private readonly appService: AppService) {}

	@Get("genImage")
	generateImage(@Query() query)
	{
		console.log(query);

		const newFileName = "file_" + Date.now() + ".png";

		textToImage.generate(query.name,
		{
			debug: true,
			margin: 30,
			debugFilename: newFileName
		}).then(function (dataUri)
		{
			const oldFilePath = "./" + newFileName;
			const newFilePath = "./public/pictures/" + newFileName;

			fs.rename(oldFilePath, newFilePath, function (err)
			{
				if (err) throw err
				console.log('Successfully renamed - AKA moved!');
			});

			console.log(dataUri);
		});


		return("/pictures/" + newFileName);
	}
}
