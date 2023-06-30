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
		console.log(
			window.Control,
			window.Control.Api,
			window.Control.Api.GetValue("cmi.interactions._count"),
			window.Control.Api.GetValue("cmi.interactions._children"),
			window.Control.Api.GetValue("cmi.lesson_status"),
			window.Control.Api.GetValue("cmi.completion_status"),
			window.Control.Api.GetValue("cmi.success_status"),
			window.Control.Api.GetValue("cmi.total_time")
		);
		const returnObject = {};
		if (window.Control && window.Control.Api) {
			const cmiInteractionCount = window.Control.Api.GetValue(
				"cmi.interactions._count"
			);
			const cmiLessonStatus =
				window.Control.Api.GetValue("cmi.lesson_status");
			const cmiInteractionChildren = window.Control.Api.GetValue(
				"cmi.interactions._children"
			);
			const cmiCompletionStatus = window.Control.Api.GetValue(
				"cmi.completion_status"
			);
			const cmiSuccessStatus =
				window.Control.Api.GetValue("cmi.success_status");
			const cmiTotalTime = window.Control.Api.GetValue("cmi.total_time");

			returnObject["cmiInteractions"] = {};
			returnObject["cmiLessonStatus"] = cmiLessonStatus;
			returnObject["cmiCompletionStatus"] = cmiCompletionStatus;
			returnObject["cmiSuccessStatus"] = cmiSuccessStatus;
			returnObject["cmiTotalTime"] = cmiTotalTime;
			for (let i = 0; i < cmiInteractionCount; i++) {
				const interactionId = "cmi.interactions." + i + ".id";
				const interactionType = "cmi.interactions." + i + ".type";
				const interactionResult = "cmi.interactions." + i + ".result";

				const id = window.Control.Api.GetValue(interactionId);
				const type = window.Control.Api.GetValue(interactionType);
				const result = window.Control.Api.GetValue(interactionResult);
				returnObject["cmiInteractions"][i] = {
					interactionId: id,
					interactionType: type,
					interactionResult: result,
				};

				console.log("Interaction " + (i + 1) + ":");
				console.log("ID:", id);
				console.log("Type:", type);
				console.log("Result:", result);
				console.log("ReturnObject:", returnObject);
			}

			window.parent.postMessage(JSON.stringify(returnObject));
		}
	}
	rscpCustomizationCompleted();
})(window);
