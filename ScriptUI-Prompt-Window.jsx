// Configure the alert text parameters to pass to the main window function
// Non breaking space character \u00A0 to avoid truncation on Win OS
scriptPrompt("Prompt Window Title", "Prompt text string:\u00A0");

// Main function
function scriptPrompt(promptTitle, promptString) {

    try {

        // PROMPT WINDOW
        var promptWindow = new Window("dialog");
        promptWindow.text = promptTitle;
        /*
        var gra = dialog.graphics;
        var uiBrush = gra.newBrush(gra.BrushType.SOLID_COLOR, [0.3, 0.3, 0.3, 1]);
        gra.backgroundColor = uiBrush;
        */
        promptWindow.preferredSize.width = 300;
        promptWindow.preferredSize.height = 100;
        promptWindow.orientation = "column";
        promptWindow.alignChildren = ["left", "top"];
        promptWindow.spacing = 15;
        promptWindow.margins = 20;

        // FIELD GROUP
        var fieldGroup = promptWindow.add("group", undefined, { name: "fieldGroup" });
        fieldGroup.orientation = "column";
        fieldGroup.alignChildren = ["left", "center"];
        fieldGroup.spacing = 5;
        fieldGroup.margins = 0;

        // PROMPT FIELD LABEL
        var promptLabel = fieldGroup.add("statictext", undefined, undefined, { name: "promptLabel" });
        promptLabel.text = promptString;
        promptLabel.preferredSize.height = 25;
        promptLabel.preferredSize.width = 300;
        // Option - swap undefined for "bold" if required
        promptLabel.graphics.font = ScriptUI.newFont("dialog", undefined, 13);
        /*
        // TEXT COLOR
        promptLabel.graphics.foregroundColor = promptLabel.graphics.newPen(promptLabel.graphics.PenType.SOLID_COLOR, [1, 1, 1], 1);
        */

        // PROMPT FIELD
        var promptField = fieldGroup.add('edittext {properties: {name: "promptField", multiline: false, scrollable: true}}');
        promptField.helpTip = "Enter your text here...";
        // Default text
        promptField.text = "";
        promptField.preferredSize.width = 260;
        promptField.active = true;

        // BUTTON GROUP
        var buttonGroup = promptWindow.add("group", undefined, { name: "buttonGroup" });
        buttonGroup.orientation = "row";
        buttonGroup.alignChildren = ["left", "top"];
        buttonGroup.spacing = 0;
        buttonGroup.margins = 0;

        // CANCEL BUTTON
        var cancelButton = buttonGroup.add("button", undefined, undefined, { name: "cancelButton" });
        cancelButton.text = "Cancel";
        cancelButton.justify = "left";

        // OK BUTTON
        var okButton = buttonGroup.add("button", undefined, undefined, { name: "okButton" });
        okButton.text = "OK";
        okButton.justify = "left";

        // RENDER THE WINDOW & OK BUTTON ACTION
        if (promptWindow.show() === 1 && (promptField.text !== "")) {
            // Code to run on OK
            placeHolderCode();
        } else {
            app.beep();
            alert("Script cancelled!");
        }

        // MOCK FUNCTION TO RUN WHEN THE OK BUTTON IS PRESSED
        function placeHolderCode() {
            // PROMPT FIELD TO VARIABLE
            // Optional regular expression processing (null placeholder)
            var returnPromptField = promptField.text.replace(/ /ig, " ");
            promptField.onClick = alert(returnPromptField);
        }
    }
    catch (err) {
        alert("If you see this message an unexpected error has occurred!");
    }

}
