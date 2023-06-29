(function (window) {
	window.addEventListener(
		"message",
		function (evet) {
			console.log("iframe getting message, new changes", evet);
			if (evet.data && evet.data == "checkingProgress") {
				extractInteractions();
			} else {
				window.Control.TriggerLegacyReturnToLMS();
			}
		},
		false
	);
	function extractInteractions() {
		const iframeWindow =
			document.getElementsByTagName("iframe")[0].contentWindow;
		console.log(
			document.getElementsByTagName("iframe")[0],
			iframeWindow,
			iframeWindow.Cmi5
		);
		if (iframeWindow && iframeWindow.API) {
			const interactionCount = iframeWindow.API.GetValue(
				"cmi.interactions._count"
			);
			const courseProgress = iframeWindow.API.GetValue(
				"cmi.core.lesson_status"
			);
			const _courseProgress = iframeWindow.API.LMSGetValue(
				"cmi.core.lesson_status"
			);
			for (let i = 0; i < interactionCount; i++) {
				const interactionId = "cmi.interactions." + i + ".id";
				const interactionType = "cmi.interactions." + i + ".type";
				const interactionResult = "cmi.interactions." + i + ".result";

				const id = iframeWindow.API.GetValue(interactionId);
				const type = iframeWindow.API.GetValue(interactionType);
				const result = iframeWindow.API.GetValue(interactionResult);
				const _id = iframeWindow.API.LMSGetValue(interactionId);
				const _type = iframeWindow.API.LMSGetValue(interactionType);
				const _result = iframeWindow.API.LMSGetValue(interactionResult);

				console.log("Interaction " + (i + 1) + ":");
				console.log("ID:", id);
				console.log("Type:", type);
				console.log("Result:", result);
				console.log("Interaction " + (i + 1) + ":");
				console.log("LMS FUNCTION ID:", _id);
				console.log("LMS FUNCTION Type:", _type);
				console.log("LMS FUNCTION Result:", _result);
			}
			console.log("Others");
			console.log("CourseProgress:", courseProgress);
			console.log("LMS FUNCTION CP:", _courseProgress);
		}
	}
	rscpCustomizationCompleted();
})(window);
