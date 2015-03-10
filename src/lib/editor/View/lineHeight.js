const TEXT_HEIGHT = 23;
const MARGIN_TOP = 30;
const MINIMUM_HEIGHT = 16 * 4;

import getHeightIncludeDescendantGrids from './getHeightIncludeDescendantGrids';

export function get(editor) {
    return Math.floor(
        parseInt(editor.find('.textae-editor__body__text-box').css('line-height')) / 16
    );
}

// Reduce the space under the .textae-editor__body__text-box same as padding-top.
export function reduceBottomSpace(editor) {
    let $textBox = editor.find('.textae-editor__body__text-box');

    // The height calculated by auto is exclude the value of the padding top.
    // Rest small space.
    $textBox
        .css({
            'height': 'auto'
        }).css({
            'height': $textBox.height() + 20
        });
}

export function set(editor, heightValue) {
    let $textBox = editor.find('.textae-editor__body__text-box');

    $textBox.css({
        'line-height': heightValue + 'px',
        'padding-top': heightValue / 2 + 'px'
    });

    reduceBottomSpace(editor);
}

export function setToTypeGap(editor, annotationData, typeContainer, typeGapValue) {
    let heightOfType = typeGapValue * 18 + 18,
        maxHeight;

    if (annotationData.span.all().length === 0) {
        maxHeight = MINIMUM_HEIGHT;
    } else {
        maxHeight = _.max(
            annotationData.span.all()
            .map(span => getHeightIncludeDescendantGrids(span, typeContainer, typeGapValue))
        );

        maxHeight += TEXT_HEIGHT + MARGIN_TOP;
    }

    set(editor, maxHeight);
}
