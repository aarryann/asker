// bstag
(function (global, factory) {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(exports, require("d3"))
    : typeof define === "function" && define.amd
      ? define(["exports", "d3"], factory)
      : ((global = global || self),
        factory((global.bsTag = {}), global.d3, global.Bloodhound));
})(this, function (exports, d3) {
  "use strict";

  d3 = d3 && d3.hasOwnProperty("default") ? d3["default"] : d3;

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === "undefined") {
      return;
    }

    var head = document.head || document.getElementsByTagName("head")[0];
    var style = document.createElement("style");
    style.type = "text/css";

    if (insertAt === "top") {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css =
    ".not-selectable{-webkit-touch-callout:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.tag{padding:3px 11px 2px 16px;background-color:#00BBE0;color:#ffffff;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;border-radius:50px;border:1px #00BBE0 solid;margin-bottom:2px;margin-right:5px}.tag p,.tag span{margin:0;padding:0;font-size:12px;font-weight:500;}.tag span.active{padding-left:5px;margin-left:5px;border-left:1px solid #fff}.suggestion{z-index:1}.suggestion.list-group-item.active{background-color:#333;border-color:#333}.suggestion.list-group-item.active .tag{border:1px solid;border-color:inherit}.tag button{color:#000000;opacity:.75;text-decoration:none;padding:0;padding-left:5px;border-style:none;border:0;font-size:1.2rem;font-weight:800;line-height:1;text-transform:none;overflow:visible;margin:none;-webkit-box-sizing:border-box;box-sizing:border-box;background-color:transparent;vertical-align:middle}.tag button:hover{color:#fff;opacity:1}.dsm-mt-pseudo-input-element{margin-bottom:5px}.dsm-mt-pseudo-input-element:focus{border:2px solid #0097cf}.dsm-mt-tag-area{padding-left:16px;padding-left:1rem;max-height:200px;overflow-y:auto;margin-bottom:0}.dsm-mt-tag-area.disabled{background-color:#9fa4aa}.dsm-mt-typeahead-input-area{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;width:2px;padding:0;overflow:auto;background-color:transparent;border:none;outline:none;-webkit-box-shadow:none;box-shadow:none;height:30px}.dsm-mt-form-element{border:2px dashed #ccc;padding:1em;margin:1em 0}.dsm-mt-typeahead-suggestion-area{position:absolute;max-height:400px;overflow-y:auto}.soft-border{background-color:#fff;border:1px solid #ccc;border-radius:5px;padding-top:0px}.hidden-form{display:none}.dsm-mt-inline-form{display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;width:100%;--bc:#333;--bsw:1px;--bgc:#fff}.dsm-mt-inline-form input{margin-top:0;padding:0}.dsm-mt-inline-form .dsm-mt-pseudo-input-element{width:100%;background-color:var(--bgc);margin-bottom:0;border-radius:10px 0 0 10px;border:var(--bsw) solid var(--bc)}.dsm-mt-inline-form .dsm-mt-btn-submit{display:inline-block!important;cursor:pointer!important;padding:0 10px!important;color:#fff!important;background-color:#007bff!important;text-align:center!important;vertical-align:middle!important;border-radius:0 10px 10px 0!important;border:var(--bsw) solid!important;border-color:var(--bc)!important;border-left:0!important;background-color:rgba(0,123,255,.96078)!important;-webkit-transition:all .3 ease;transition:all .3 ease}.dsm-mt-inline-form .dsm-mt-btn-submit:hover{opacity:.75!important;-webkit-transition:all .5 ease!important;transition:all .5 ease!important}.dsm-mt-inline-form .dsm-mt-tag-area{height:auto;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-ms-flex-wrap:wrap;flex-wrap:wrap;width:100%!important}.dsm-mt-inline-form .tag,.dsm-mt-inline-form input{margin-top:5px;display:-webkit-inline-box;display:-ms-inline-flexbox;display:inline-flex;white-space:nowrap}";
  // styleInject(css);

  /**
   * Populates the multitag instance with tags provided in tagData
   * @param {Array|Object} tagData a list or object of tags to be added. If
   * tagData is an object then assumes that keys are the tag type and each value is
   * a list of values under that type.
   * @example
   * // ["tagA", "tagB", "tagC", "tagD"]
   * // or
   * // {category1: ["tagA", "tagB"], category2:["tagC", "tagD"]}
   * @param {multitag} multitag a multitag instance
   * @param {Function} func a function for converting tag to tag data.
   * if tagData is an array by default returns tag value
   * if tagData is an object by default returns {key: key, value: tag}
   * @return {undefined}
   */
  function populateTags(tagData, multitag, func) {
    if (Array.isArray(tagData)) {
      if (func == undefined) {
        func = function func(tag) {
          return tag;
        };
      }
      tagData.map(function (tag, i) {
        multitag.makeTag(func(tag));
      });
    } else {
      if (func == undefined) {
        func = function func(key, tag) {
          return { key: key, value: tag };
        };
      }
      d3.keys(tagData).map(function (key, i) {
        tagData[key].map(function (tag, j) {
          multitag.makeTag(func(key, tag));
        });
      });
    }
  }

  /**
   * Sets up a multitag instance
   * @constructor multitag
   * @namespace multitag
   * @returns {function} multitag
   */
  function multitag() {
    /*------------------------------------------------------------------------*
     *                                                                         *
     *                        HIDDEN CLSOURE VARIABLES                         *
     *                                                                         *
     *-------------------------------------------------------------------------*/
    var enterKey = 13,
      // for readibility
      commaKey = 188,
      // for readibility
      leftArrow = 37,
      // for readibility
      upArrow = 38,
      // for readibility
      rightArrow = 39,
      // for readibility
      downArrow = 40,
      // for readibility
      backspace = 8,
      // for readibility
      deleteKey = 46,
      // for readibility
      suggestionClass = "suggestion",
      // for flexibility
      tagClass = "tag",
      /* not yet implemented. would offer marginal
           efficiency increase rather than constantly
           using selectors to get values from the
           tag elements themselves
         */
      allowDuplicatesQ = false,
      /* for flexibility. not fully implemented yet */
      queryDescription,
      inputAreaTextPixelValue = 8;

    /*------------------------------------------------------------------------*
     *                                                                         *
     *                 DEFAULTS FOR PUBLIC CLSOURE VARIABLES                   *
     *                                                                         *
     *-------------------------------------------------------------------------*/
    var hiddenInputArea,
      // id of your actual form  NOTE: assumes "#" is in there
      typeaheadInputArea,
      // id of the typeahead input area NOTE: assumes "#" is in there
      typeaheadInputSuggestionList,
      // id of the place where suggestions should appear NOTE: assumes "#" is in there
      taggedList,
      // id of the place where tags should appear NOTE: assumes "#" is in there
      maxNumberOfTaggedItems = Infinity,
      // for flexibility
      maxSuggestions = 5,
      // for flexibility
      confirmInputKeys = [enterKey, commaKey],
      // when to make a tag based on input text
      submitInputKeys = [enterKey],
      // when to submit form
      suggestionMovementKeys =
        // when to move highlighted suggestion
        [leftArrow, upArrow, rightArrow, downArrow],
      backwardsDeleteKeys = [backspace],
      // what keys to delete backwards
      bloodHound,
      // twitter bloodhound instance for typeahead
      alertArea,
      // area for where alerts should go
      pseudoInputArea,
      // container of typeahed input area
      namespace = "dsm-mt-",
      // to avoid clashes with
      debug = true,
      // for logging information
      asyncQ = false,
      // needed for async updates
      badgeQ = false,
      // for handling objects
      hiddenInputDelim = ","; // how tags are seperated in the hidden input form

    function multitag() {
      var typeaheadInputAreaSelection = d3.select(typeaheadInputArea);
      typeaheadInputAreaSelection.on("keyup", typeaheadToTag);
      typeaheadInputAreaSelection.on("keydown", arrowToChangeSelection);

      resizeAndRepositionTypeaheadSuggestions(); // had absolute positioning, so need to move it
      clickOnPseudoInputAreaToFocusOnTypeaheadInputArea();
      deleteTagOnBackspaceKeyPressIfTypeaheadInputEmpty();
      typeaheadPasteEvent();
      emptyTypeaheadSuggestions();
      resizeInputAreaToInput(inputAreaTextPixelValue);
      arrowToMoveInputArea();
    }

    /**
     * Binds event to resize input area to the amount of text inside
     * @function resizeInputAreaToInput
     * @param {number} int scaling factor for each character's width
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function resizeInputAreaToInput(int) {
      /*
      controls the size of the input area inside the tag area. This allows it
      to grow and prevents overfill. Thus if it is moved between tags, then it
      allows tags to wrap to the next line.
      */
      if (int == undefined) {
        int = 200;
      }
      d3.select(typeaheadInputArea).node().oninput = function () {
        // console.log(d3.select(typeaheadInputArea).node())
        var v = d3.select(typeaheadInputArea).property("value");
        var l = v.length;
        var w = l == -1 ? 0 : (l + 1) * int;
        d3.select(typeaheadInputArea).node().style.width = w + "px";
        // d3.select(typeaheadInputArea).node().style.width = Math.max(0,l) + 'ch'
      };
    }

    /**
     * Binds event on arrow key press to move input between tags
     * @function arrowToMoveInputArea
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function arrowToMoveInputArea() {
      var tIA = d3.select(typeaheadInputArea); // there area where the user types
      tIA.node().addEventListener("keydown", function (event) {
        var emptyInputQ = !tIA.property("value").length;
        if (emptyInputQ) {
          // only allow delete of tag if input is empty
          var arrowPressedQ = hasQ(suggestionMovementKeys, event.which);
          if (arrowPressedQ) {
            event.preventDefault();
            arrowControlForInputMovement(event);
            d3.select(typeaheadInputArea)
              .node()
              .oninput();
          }
        }
      });
    }

    /**
     * Handles event on arrow key press to move input between tags
     * @function arrowControlForInputMovement
     * @param {Event} event
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function arrowControlForInputMovement(event) {
      // test to see if up keys are enabled
      var upKeys = [leftArrow, upArrow].map(function (key, i) {
        if (hasQ(suggestionMovementKeys, key)) {
          return key;
        }
      });
      var goUpQ = hasQ(upKeys, event.which);
      // move the currently selected suggestion
      if (goUpQ) {
        changeInputPosition("up");
      }

      // test to see if down keys are enabled
      var downKeys = [downArrow, rightArrow].map(function (key, i) {
        if (hasQ(suggestionMovementKeys, key)) {
          return key;
        }
      });
      var goDownQ = hasQ(downKeys, event.which);
      // move the currently selected suggestion
      if (goDownQ) {
        changeInputPosition("down");
      }
    }

    /**
     * Moves input between tags
     * @function changeInputPosition
     * @param {string} direction
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function changeInputPosition(direction) {
      var pN = d3.select(d3.select(typeaheadInputArea).node().parentNode);
      var inputIndex, numberOfElements, before;

      numberOfElements = pN.selectAll(".tag,input").size();
      pN.selectAll(".tag,input").filter(function (d, i) {
        if (d3.select(this).node().nodeName == "INPUT") {
          inputIndex = i;
        }
      });
      pN.selectAll(".tag,input").filter(function (d, i) {
        if (direction == "down" && i == inputIndex + 2) {
          before = d3.select(this);
        }
        if (direction == "up" && i == inputIndex - 1) {
          before = d3.select(this);
        }
      });

      if (before != undefined) {
        pN.node().insertBefore(
          d3.select(typeaheadInputArea).node(),
          before.node()
        );
      } else if (
        direction == "down" &&
        before == undefined &&
        inputIndex == numberOfElements - 2
      ) {
        pN.node().appendChild(d3.select(typeaheadInputArea).node());
      }

      var tIA = d3
        .select(typeaheadInputArea)
        .node()
        .focus();
    }

    // routes keyup in typeahead input area to done typing / still typing
    /**
     * Binds event on confirmInputKeys pressed, to convert active suggestion to tag
     * @function typeaheadToTag
     * @param {Object} d
     * @param {number} i
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function typeaheadToTag(d, i) {
      var event = d3.event;
      var typeaheadText = d3.select(typeaheadInputArea).property("value");

      if (typeaheadText == "") {
        //
        clearSuggestions();
        if (hasQ(submitInputKeys, event.which)) {
          // clear suggestions for next input

          var validQ = submitErrorHandling(getTagsFromTaggedElements());
          submitHiddenForm(validQ);
        }
      } else {
        if (hasQ(confirmInputKeys, event.which)) {
          doneTyping(typeaheadText);
        } else {
          stillTyping(typeaheadText);
        }
      }
    }
    // up, left, down, right to change active selection
    /**
     * Binds event on arrow key press to change active selection
     * @function arrowToChangeSelection
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function arrowToChangeSelection(d, i) {
      var event = d3.event;
      var suggestions = getSuggestionsSelection();
      var suggestionExistQ = !suggestions.empty();

      if (suggestionExistQ) {
        // if suggestions exist and an arrow was pressed, change active selection
        var arrowPressedQ = hasQ(suggestionMovementKeys, event.which);
        if (arrowPressedQ) {
          event.preventDefault();
          arrowControlForSelectedSuggestion(event);
        }
      }
    }
    // click on pseduo area to focus on input area, useful as it moves around
    /**
     * Binds event that when clicks anywhere in pseudoInputArea, it places the cursor inside typeaheadInputArea
     * @function clickOnPseudoInputAreaToFocusOnTypeaheadInputArea
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function clickOnPseudoInputAreaToFocusOnTypeaheadInputArea() {
      var pIA = d3.select(pseudoInputArea);
      var tL = d3.select(taggedList);
      var tIA = d3.select(typeaheadInputArea);

      pIA.node().addEventListener("click", function (event) {
        if (debug) {
          console.log(
            "Clicked on pseduo input area. Focusing on typeahead input area"
          );
        }
        tIA.node().focus();
      });
    }
    // if no input, delete tag on backspace
    /**
     * Binds the event that when deleteKey is pressed, removes proceeding tag if input empty
     * @function deleteTagOnBackspaceKeyPressIfTypeaheadInputEmpty
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function deleteTagOnBackspaceKeyPressIfTypeaheadInputEmpty() {
      var tIA = d3.select(typeaheadInputArea); // there area where the user types
      tIA.node().addEventListener("keydown", function (event) {
        var emptyInputQ = !tIA.property("value").length;
        if (emptyInputQ) {
          // only allow delete of tag if input is empty
          if (hasQ(backwardsDeleteKeys, event.which)) {
            // if a backspace key
            var tagsParent = getTagsContainerSelection(); // get parent of tag
            var prev = d3.select(tIA.node().previousElementSibling); // and tag in front of input
            if (prev.empty()) {
              return;
            } // nothing before input, return
            tagsParent
              .selectAll("." + hypenate(namespace, tagClass))
              .each(function (d, i) {
                var datum = d3.select(this).datum();
                if (datum == prev.datum()) {
                  removeTag(d, i);
                } // use the removeTag function to keep everything synced
              });
          }
        }
      });
    }
    // capture paste event and convert it into tags
    /**
     * Handles the paste event and makes tags as needed
     * @function typeaheadPasteEvent
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function typeaheadPasteEvent() {
      var tIA = d3.select(typeaheadInputArea);
      tIA.node().addEventListener("paste", function (event) {
        var clipboard, pastedData;
        // prevent paste from happening
        event.stopPropagation();
        event.preventDefault();

        clipboard = event.clipboardData || window.clipboardData;
        pastedData = clipboard.getData("Text");

        var text = tIA.property("value");
        var putativeTags = pasteEventTextParser(pastedData);

        // for each tag after being parsed
        putativeTags.map(function (pTag, tagIndex) {
          var tResult = bloodHound.get(pTag);
          if (tResult.length) {
            makeTagSyncFormSuggestionsAndInput(tResult[0]);
          } else if (asyncQ) {
            var extract = function extract(datums) {
              // console.table({async:asyncQ,putativeTag:pTag,bloodhoundDatums:datums})
              var foundQ = false;
              for (var i = 0; i < datums.length; i++) {
                if (tagDataToTagText(datums[i]) == pTag) {
                  foundQ = true;
                  makeTagSyncFormSuggestionsAndInput(datums[i]);
                  if (!foundQ) {
                    makeTypeaheadAlert(
                      "Invalid",
                      '"' + pTag + '" is not a valid entry.',
                      "warning"
                    );
                  }
                }
              }
            };
            bloodHound.search(pTag, extract, extract);
          } else {
            makeTypeaheadAlert(
              "Invalid",
              '"' + pTag + '" is not a valid entry.',
              "warning"
            );
          }
        });
      });
    }
    // function for how to parse pasted text
    /**
     * How to handle text as it is pasted in, returns list of putative tags
     * @function pasteEventTextParser
     * @param {string} text
     * @returns {string[]}
     * @memberof multitag
     * @property
     */
    function pasteEventTextParser(text) {
      var putativeTags = text.split("\n");
      // putativeTags = putativeTags.map(function (e, i) {return e.toUpperCase()})
      return putativeTags;
    }
    // ensure typeahead suggestions is correctly sized and positioned
    /**
     * Moves suggestions to appropriate area
     * @function resizeAndRepositionTypeaheadSuggestions
     * @param {selector} sizeTo (css selector) to whcih the typeaheadInputSuggestionList should align with and match width with
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function resizeAndRepositionTypeaheadSuggestions(sizeTo) {
      if (sizeTo == undefined) {
        sizeTo = taggedList;
      }
      var sT = d3.select(sizeTo);
      var bcr = sT.node().getBoundingClientRect();

      if (
        d3.select(typeaheadInputSuggestionList).style("position") == "absolute"
      ) {
        var htmlScroll =
          (window.pageYOffset || document.documentElement.scrollTop) -
          (document.documentElement.clientTop || 0);
        d3.select(typeaheadInputSuggestionList)
          .style("width", bcr.width + "px")
          .style("left", bcr.left + "px")
          .style("top", bcr.bottom + htmlScroll + "px");
        d3.select("html")
          .node()
          .appendChild(d3.select(typeaheadInputSuggestionList).node());
      }
    }

    /*------------------------------------------------------------------------*
     *                                                                         *
     *                            CORE FUNCTIONS                               *
     *                                                                         *
     *-------------------------------------------------------------------------*/
    // when a user hits a confirmInputKeys, by default: [enter], [,]
    /**
     * Logic for what happens while user has typed a confirmInputKeys
     * get active suggestion --> makes tag --> sync hidden form --> clear suggestions --> empty input area text
     * @function doneTyping
     * @param {string} text
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function doneTyping(text) {
      var suggestedItems = getSuggestionsSelection();
      if (suggestedItems.empty()) {
        makeTypeaheadAlert(
          "Invalid",
          '"' + text + '" is not in our list of entries.',
          "warning"
        );
        return;
      } // no suggestions
      else {
        var sugParent = d3.select(suggestedItems.node().parentNode);
      }
      var suggestedItem = sugParent.select(".active"); // get highlighted suggestion
      var suggestedData = suggestedItem.datum(); // get suggested data
      makeTagSyncFormSuggestionsAndInput(suggestedData);
    }

    function makeTagSyncFormSuggestionsAndInput(tagData) {
      var tags = makeTag(tagData); // tag item.
      if (tags.length) {
        syncTagsAndHiddenForm(tags);
      } // if there are tags, sync forms
      clearSuggestions(); // clear suggestions for next input
      var typeaheadText = d3.select(typeaheadInputArea).property("value", "");
      d3.select(typeaheadInputArea).dispatch("input");
    }

    // function for what to do while user still types, e.g. typeahead, suggestions
    /**
     * Logic for what happens while user has typed something but not a confirmInputKeys
     * parse input string --> position suggestions --> search for suggestions --> sync suggestiosn
     * @function stillTyping
     * @param {string} text
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function stillTyping(text) {
      var text = parsePseudoInputAreaText(text);
      resizeAndRepositionTypeaheadSuggestions();

      if (text == "") {
        clearSuggestions();
        return;
      }
      if (asyncQ) {
        bloodHound.search(text, function () { }, syncSuggestions);
      } else {
        bloodHound.search(text, syncSuggestions);
      }
    }

    // responsible for the logic about making tags
    /**
     * Handles logic for making the tag
     * @function makeTag
     * @param {Object} tagData
     * @returns {Object[]} list of current tags
     * @memberof multitag
     * @property
     */
    function makeTag(tagData) {
      var currentTags = getTagsFromTaggedElements();
      // console.table({currentTags:currentTags, hasQ:hasQ(currentTags, tagData)})
      var alreadyTaggedQ = hasQ(currentTags, tagData, tagDataToTagText);
      var maxedOutQ = currentTags.length >= maxNumberOfTaggedItems;

      if (debug) {
        console.log(
          "makeTag with data: ",
          tagData,
          " alreadyTaggedQ: ",
          alreadyTaggedQ,
          " maxedOutQ: ",
          maxedOutQ,
          " allowDuplicatesQ: ",
          allowDuplicatesQ
        );
      }
      // too many elements, no more tags
      if (maxedOutQ) {
        makeTypeaheadAlert(
          "Too many",
          "you may only have " + maxNumberOfTaggedItems + " tags.",
          "warning"
        );
        return currentTags;
      }

      if (alreadyTaggedQ) {
        if (allowDuplicatesQ) {
          currentTags.push(tagData);
          makeTagElement(tagData);
          syncTagsAndHiddenForm(tags);
        } // make a duplicate tag
      } else {
        // not tagged and not over tag limit, add tag
        currentTags.push(tagData);
        makeTagElement(tagData);
        syncTagsAndHiddenForm(currentTags);
      }
      return currentTags;
    }
    // sync tags and values in the hidden form
    /**
     * Syncs tag data with hiddenInputArea
     * @function syncTagsAndHiddenForm
     * @param {Object[]} tags
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function syncTagsAndHiddenForm(tags) {
      var s = "";
      tags.map(function (tag, ind) {
        if (ind + 1 == tags.length) {
          s += tagToHidden(tag);
        } else {
          s += tagToHidden(tag) + hiddenInputDelim;
        }
      });
      d3.select(hiddenInputArea).property("value", s);
    }

    // converts tag data to string for the hidden input value
    /**
     * Converts the tag data to the string to be synced with the hidden form
     * @function tagToHidden
     * @param {Object} tagData
     * @returns {string}
     * @memberof multitag
     * @property
     */
    function tagToHidden(tagData) {
      return tagData;
    }
    /*------------------------------------------------------------------------*
     *                                                                         *
     *                             MAKING TAGS                                 *
     *                                                                         *
     *-------------------------------------------------------------------------*/
    // Reponsible for make the actual element
    /**
     * Makes the tag element (and does not sync)
     * @function makeTagElement
     * @param {Object} tagData
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function makeTagElement(tagData) {
      if (debug) {
        console.log("makeTagElement with: ", tagData);
      }
      var tagEl = d3
        .select(taggedList)
        .insert("div", "input")
        .datum(tagData)
        .attr("id", hypenate(namespace, tagClass, tagDataToTagText(tagData)))
        .classed(tagClass, true) // NOTE: other classes can go here
        .classed(hypenate(namespace, tagClass), true) // NOTE: other classes can go here
        .classed("not-selectable", true);

      var tagText = tagEl.append("p").html(tagDataToTagText(tagData));
      var tagBadge = tagEl.append("span");

      if (badgeQ) {
        tagEl.classed(tagDataToBadgeText(tagData), true);
        tagBadge.html(tagDataToBadgeText(tagData)).classed("active", true);

        // tagEl.on('mouseover', function(d, i) {
        //   tagBadge.html(tagDataToBadgeText(text)).classed('active', true)
        // })
        // tagEl.on('mouseout', function(d, i) {
        //   tagBadge.html("").classed('active', false)
        // })
      }
      // .classed('badge badge-primary align-middle', true)

      var numDups = d3
        .selectAll(
          '[id="' +
          hypenate(namespace, tagClass, tagDataToTagText(tagData)) +
          '"]'
        )
        .size();
      tagEl.attr("tag-duplicate-number", numDups);

      var button = tagEl
        .append("button")
        .attr("type", "button")
        .html("&times;")
        .on("click", function (d, i) {
          removeTag(d, i);
        });

      // .attr('class', 'close align-middle')
      // .style('float', 'none')
      scrollBarToBottom();

      if (queryDescription != undefined) {
        updateQueryDescription();
      }
    }

    // handles logic of tag removal
    /**
     * Removes the tag element and syncs the removal with the hidden form
     * @function removeTag
     * @param {Object} d
     * @param {number} i
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function removeTag(d, i) {
      var tags = getTagsFromTaggedElements();
      // NOTE: this currently will affect the ordering of the tags
      // to prevent this ensure that i is the index of the tag in relation to the
      // parent elemnt (which holds all the tags), and set removalIndex appropriately
      var removalIndex = tags.indexOf(d);
      tags.splice(removalIndex, 1); // remove tag in place
      removeTagElement(d, i);

      syncTagsAndHiddenForm(tags);
      if (queryDescription != undefined) {
        updateQueryDescription();
      }
    }
    // Responsible for removing the actual element
    /**
     * Removes the actual tag element (does not sync)
     * @function removeTagElement
     * @param {Object} d
     * @param {number} i
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function removeTagElement(d, i) {
      // NOTE: select returns the first instance of the value that matches the
      // selection criteria. So if allowDuplicatesQ is true, this may cause issues.
      // This can be remedied by ensuring that the id given to the tag is unique,
      // by selecting the tag id, and while the selection is not empty appending a
      // counter of some kind, and storing that as an attribute of the tag
      d3.select(
        '[id="' + hypenate(namespace, tagClass, tagDataToTagText(d)) + '"]'
      ).remove();
    }

    /**
     * Removes text from typeaheadInputArea when clicked outside of the pseudoInputArea
     * @function emptyTypeaheadSuggestions
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function emptyTypeaheadSuggestions() {
      d3.select("body")
        .node()
        .addEventListener("click", function () {
          // bloodHound.search('', syncSuggestions)
          // syncSuggestions([])
          clearSuggestions();
          d3.select(typeaheadInputArea)
            .property("value", "")
            .dispatch("input");
          // d3.select(typeaheadInputArea)
        });
    }
    /*------------------------------------------------------------------------*
     *                                                                         *
     *                            SIMPLE HELPERS                               *
     *                                                                         *
     *-------------------------------------------------------------------------*/
    // helper for ensuring # in id
    /**
     * Ensures id elements start with a octotrope (#)
     * @function toId
     * @param {string} id
     * @returns {string}
     * @memberof multitag
     * @property
     */
    function toId(id) {
      return id.includes("#") ? id : "#" + id;
    }
    // helper - and shorter - for includes(item).
    /**
     * Moniker for Array.includes(element)
     * @function lastOfSplitBy
     * @param {Array} list
     * @param {*} item
     * @returns {boolean}
     * @memberof multitag
     * @property
     */
    function hasQ(list, item, keyExtractor) {
      if (objectQ(item)) {
        if (keyExtractor == undefined) {
          keyExtractor = tagDataToTagText;
        }
        for (var i = 0; i < list.length; i++) {
          if (keyExtractor(list[i]) == keyExtractor(item)) {
            return true;
          }
        }
      }
      return list.includes(item);
    }
    // last element when split
    /**
     * Splits text via by and returns the resultant of the split
     * @function lastOfSplitBy
     * @param {string} text
     * @param {string} by
     * @returns {string}
     * @memberof multitag
     * @property
     */
    function lastOfSplitBy(text, by) {
      var t = text.split(by);
      return t[t.length - 1];
    }
    //
    /**
     * Parses the pseudoInputArea text prior to passing it to be queried in bloodhound
     * @function parsePseudoInputAreaText
     * @param {string} text
     * @returns {string}
     * @memberof multitag
     * @property
     */
    function parsePseudoInputAreaText(text) {
      return lastOfSplitBy(lastOfSplitBy(text, "\n"), ",");
    }
    // hot potato for class
    /**
     * Toggles classToPass on currentChild and moves it to either previous or next sibiling depending on which
     * @function passClassToSibling
     * @param {string} classToPass
     * @param {d3.selection} currentChild
     * @param {string} whichSibling previous or next
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function passClassToSibling(classToPass, currentChild, whichSibling) {
      var sib;
      if (whichSibling == "previous") {
        sib = d3.select(currentChild.node().previousElementSibling);
      }
      if (whichSibling == "next") {
        sib = d3.select(currentChild.node().nextElementSibling);
      }
      if (sib.empty()) {
        var parent = d3.select(currentChild.node().parentNode);
        if (whichSibling == "previous") {
          sib = parent.select(":last-child." + suggestionClass);
        }
        if (whichSibling == "next") {
          sib = parent.select(":first-child." + suggestionClass);
        }
      }
      var currentState = currentChild.classed(classToPass);
      scrollBarToElement(typeaheadInputSuggestionList, currentChild);
      currentChild.classed(classToPass, !currentState);
      sib.classed(classToPass, currentState);
    }

    // helper to clear suggestions
    /**
     * Clears all suggestions
     * @function clearSuggestions
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function clearSuggestions() {
      d3.select(typeaheadInputSuggestionList)
        .selectAll("." + suggestionClass)
        .remove();
    }
    // helper for getting suggestions from the DOM
    /**
     * Returns the data of the suggestion elements
     * @function getSuggestionsFromSuggestionElements
     * @returns {Object[]}
     * @memberof multitag
     * @property
     */
    function getSuggestionsFromSuggestionElements() {
      var sugSelection = getSuggestionsSelection();
      if (sugSelection.empty()) {
        return [];
      }
      return sugSelection.data();
    }
    // helper for getting the data from the tags currently in DOM
    /**
     * Returns the data of the tag elements
     * @function getTagsFromTaggedElements
     * @returns {Object[]}
     * @memberof multitag
     * @property
     */
    function getTagsFromTaggedElements() {
      var tagSelection = getTagsSelection();
      if (tagSelection.empty()) {
        return [];
      }
      return tagSelection.data();
    }

    // tags any number of args - assuming they are text - and hypenates them
    /**
     * Hypenates the arguments
     * @function hypenate
     * @param {string[]}
     * @returns {string}
     * @memberof multitag
     * @property
     */
    function hypenate() {
      return Array.prototype.slice.call(arguments).join("-");
    }

    /**
     * Scrolls the scrollableElementId to the bottom
     * @function scrollBarToBottom
     * @param {string} scrollableElementId
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function scrollBarToBottom(scrollableElementId) {
      if (scrollableElementId == undefined) {
        scrollableElementId = taggedList;
      }
      d3.select(scrollableElementId).node().scrollTop = d3
        .select(scrollableElementId)
        .node().scrollHeight;
    }

    /**
     * Scrolls the scrollableElementId to the location of the element
     * @function scrollBarToElement
     * @param {string} scrollableElementId
     * @param {Element} element
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function scrollBarToElement(scrollableElementId, element) {
      if (scrollableElementId == undefined) {
        scrollableElementId = taggedList;
      }
      d3
        .select(scrollableElementId)
        .node().scrollTop = element.node().getBoundingClientRect().height;
    }
    /*------------------------------------------------------------------------*
     *                                                                         *
     *                           SIMPLE SELECTORS                              *
     *                                                                         *
     *-------------------------------------------------------------------------*/
    // get the selection of the container which houses the tags
    /**
     * Returns selection for the element (typeaheadInputSuggestionList) which contains the suggestions
     * @function getSuggestionsContainerSelection
     * @returns {d3.selection}
     * @memberof multitag
     * @property
     */
    function getSuggestionsContainerSelection() {
      return d3.select(typeaheadInputSuggestionList);
    }
    // get the selection of the suggestions themselves, not their parent
    /**
     * Returns the selectAll of all suggstions under this instances namespace
     * @function getSuggestionsSelection
     * @returns {d3.selection}
     * @memberof multitag
     * @property
     */
    function getSuggestionsSelection() {
      return getSuggestionsContainerSelection().selectAll(
        "." + suggestionClass
      );
    }

    // get the container which houses the tags
    /**
     * Returns selection for the element (taggedList) which contains the tags
     * @function getTagsContainerSelection
     * @returns {d3.selection}
     * @memberof multitag
     * @property
     */
    function getTagsContainerSelection() {
      return d3.select(taggedList);
    }
    // get the selection of the tags themselves, not their parent
    // function getTagsSelection() { return tagSelection = getTagsContainerSelection().selectAll('.'+hypenate(namespace,tagClass)) }
    /**
     * Returns the selectAll of all tags under this instances namespace
     * @function getTagsSelection
     * @returns {d3.selection}
     * @memberof multitag
     * @property
     */
    function getTagsSelection() {
      return d3.select("body").selectAll("." + hypenate(namespace, tagClass));
    }

    /*------------------------------------------------------------------------*
     *                                                                         *
     *                          MANIPULATE SUGGESTIONS                         *
     *                                                                         *
     *-------------------------------------------------------------------------*/
    /**
     * Binds the arrow keys to change the active suggestion by then calling
     * changeSelectedSuggestion
     * @function arrowControlForSelectedSuggestion
     * @param {Event} event
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function arrowControlForSelectedSuggestion(event) {
      // test to see if up keys are enabled
      var upKeys = [leftArrow, upArrow].map(function (key, i) {
        if (hasQ(suggestionMovementKeys, key)) {
          return key;
        }
      });
      var goUpQ = hasQ(upKeys, event.which);
      // move the currently selected suggestion
      if (goUpQ) {
        changeSelectedSuggestion("up");
      }

      // test to see if down keys are enabled
      var downKeys = [downArrow, rightArrow].map(function (key, i) {
        if (hasQ(suggestionMovementKeys, key)) {
          return key;
        }
      });
      var goDownQ = hasQ(downKeys, event.which);
      // move the currently selected suggestion
      if (goDownQ) {
        changeSelectedSuggestion("down");
      }
    }

    /**
     * Changes the suggestion to either the previous of next depending on direction
     * @function changeSelectedSuggestion
     * @param {string} direction ('up' or 'down')
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function changeSelectedSuggestion(direction) {
      var active = d3.select(typeaheadInputSuggestionList).select(".active");
      if (active.empty()) {
        return;
      }
      if (direction == "up") {
        passClassToSibling("active", active, "previous");
      }
      if (direction == "down") {
        passClassToSibling("active", active, "next");
      }
    }

    // change active selection via hover
    /**
     * Binds hover over the suggestion element to making it the active suggestion
     * @function hoverToChangeSuggestion
     * @param {Object} d
     * @param {number} i
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function hoverToChangeSuggestion(d, i) {
      if (debug) {
        console.log("hovered on ", d, i);
      }
      var sugs = getSuggestionsContainerSelection();
      var active = sugs.select(".active");
      var activeDatum = active.datum();
      if (debug) {
        console.log("current active ", active.datum());
      }
      if (activeDatum == d) {
        return;
      }

      var hoveredOn = sugs.select(":nth-child(" + (i + 1) + ")");
      hoveredOn.classed("active", true);
      active.classed("active", false);
    }
    // tag selection on click
    /**
     * Binds click on the suggestion element to entering the tag
     * @function clickToTagSuggestion
     * @param {Object} d
     * @param {number} i
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function clickToTagSuggestion(d, i) {
      if (debug) {
        console.log("click on ", d);
      }
      var tags = makeTag(d); // tag suggested item.
      if (tags.length) {
        syncTagsAndHiddenForm(tags);
      } // if there are tags, sync forms
      clearSuggestions(); // clear suggestions for next input
      var typeaheadText = d3.select(typeaheadInputArea).property("value", "");
    }
    // logic for handling suggestions from twitter's bloodhound
    /**
     * Filters the suggestions by maxSuggestions and allowDuplicatesQ
     * @function filterSuggestions
     * @param {Object[]} suggestions
     * @returns {Object[]}
     * @memberof multitag
     * @property
     */
    function filterSuggestions(suggestions) {
      if (!allowDuplicatesQ) {
        // no duplicates allowed, lets dump them
        var tags = getTagsFromTaggedElements();
        for (var i = 0; i < tags.length; i++) {
          suggestions = suggestions.filter(function (sug) {
            return tagDataToTagText(sug) !== tagDataToTagText(tags[i]);
          });
          // if (hasQ(suggestions, tags[i], tagDataToTagText)) {
          //   suggestions.splice(suggestions.indexOf(tags[i]), 1)
          // }
        }
      }
      // only up to max number of suggestions
      var filtered = suggestions.slice(0, maxSuggestions);
      if (debug) {
        console.log(
          "filterSuggestions with allowDuplicatesQ: ",
          allowDuplicatesQ,
          " filtered: ",
          filtered
        );
      }

      return filtered;
    }

    /**
     * Syncs the suggestions with the typeaheadInputSuggestionList area
     * by calling makeSuggestions
     * @function syncSuggestions
     * @param {Object[]} suggestions
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    // sync the suggestions drop down with bloodhound search results
    function syncSuggestions(suggestions) {
      // console.log('\nSYNC\n')
      // twitter bloodhound search returns list of suggestions
      // console.table({sug:suggestions})
      // console.log(suggestions)
      var suggestions = filterSuggestions(suggestions);
      makeSuggestions(suggestions);
    }

    /**
     * Processes the suggestions and renders the elements
     * by calling makeSuggestion
     * @function makeSuggestions
     * @param {Object[]} suggestions
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function makeSuggestions(suggestions) {
      var sugLis = getSuggestionsSelection();
      if (sugLis.size() < suggestions.length) {
        // not enough list elements, add more
        sugLis = sugLis
          .data(suggestions)
          .enter()
          .append("li")
          .classed(suggestionClass, true);
      } else if (sugLis.size() > suggestions.length) {
        // too many remove
        sugLis
          .data(suggestions)
          .exit()
          .remove();
      }
      // still need to rebind data to handle old suggestions
      var sugLis = getSuggestionsSelection();

      sugLis
        .data(suggestions)
        .each(function (d, i) {
          makeSuggestion(d3.select(this));
        })
        .on("click", function (d, i) {
          clickToTagSuggestion(d, i);
        })
        .on("mouseover", function (d, i) {
          hoverToChangeSuggestion(d, i);
        });
      if (!sugLis.empty()) {
        // see if one of the suggestions is currently active
        var sugParent = d3.select(sugLis.node().parentNode);
        var anyActive = sugParent.select(".active").empty() ? false : true;
        // if no active suggestion, make first suggestion active
        if (!anyActive) {
          sugParent.select(":first-child").classed("active", true);
        }
      }
    }

    /**
     * Makes the actual suggestion element
     * @function makeSuggestion
     * @param {Object} suggestionElement
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function makeSuggestion(suggestionElement) {
      var suggestionData = suggestionElement.datum();
      var badge = suggestionElement.select("span.badge");

      suggestionElement
        .html(tagDataToTagText(suggestionData))
        .classed(suggestionClass, true)
        .classed("list-group-item", true) // can be removed for custom styling
        .classed("d-flex", true)
        .classed("justify-content-between", true)
        .classed("align-items-center", true);

      if (badge.empty() && badgeQ) {
        badge = suggestionElement
          .append("span")
          .classed("tag", true)
          .classed(tagDataToBadgeText(suggestionData), true)
          .html(tagDataToBadgeText(suggestionData));
      }
    }

    /*------------------------------------------------------------------------*
     *                                                                         *
     *                            MAKING ALERTS                                *
     *                                                                         *
     *-------------------------------------------------------------------------*/

    /**
     * deletes all elements with id i
     * @function anywhereClickDestoryMe
     * @param {string} id
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function anywhereClickDestoryMe(id) {
      var i = id.includes("#") ? id : "#" + id;
      d3.selectAll(i).remove();
    }

    /**
     * Appends an alert to the alertArea
     * title: message <-- colored by type
     * @function makeTypeaheadAlert
     * @param {string} title
     * @param {string} message
     * @param {string} type
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function makeTypeaheadAlert(title, message, type) {
      var p = d3.select(alertArea);
      var d = p
        .append("div")
        .classed("alert alert-dismissible fade show", true)
        .classed("alert-" + type, true)
        .attr("id", "destroy-me");

      var s = d.append("strong").html(title + ": ");
      d.html(d.html() + message);

      d.append("button")
        .html("&times;")
        .attr("type", "button")
        .attr("class", "close")
        .attr("data-dismiss", "alert")
        .html("&times;");

      d3.select(pseudoInputArea).on("click", function removeTypeaheadAlert() {
        anywhereClickDestoryMe("destroy-me");
      });
    }
    /*------------------------------------------------------------------------*
     *                                                                         *
     *                            queryDescription                             *
     *                                                                         *
     *-------------------------------------------------------------------------*/
    /**
     * updates the queryDescription text values based on the tags
     * @function updateQueryDescription
     * @returns {undefined}
     * @memberof multitag
     * @property
     */
    function updateQueryDescription() {
      var qD = d3.select(queryDescription);
      var tags = getTagsFromTaggedElements();
      qD.html("");
      if (badgeQ) {
        var classes = {};
        tags.map(function (e, i) {
          var b = tagDataToBadgeText(e);
          if (!hasQ(d3.keys(classes), b)) {
            classes[b] = [];
          }
          classes[b].push(tagDataToTagText(e));
        });
        d3.keys(classes).map(function (c, i) {
          if (i != 0) {
            qD.append("kbd").html(" and ");
          }
          var d = qD.append("div");
          d.append("strong").html(c);
          d.html(d.html() + ": (");

          classes[c].map(function (e, i) {
            if (i != 0) {
              d.append("kbd").html(" or ");
            }
            d.html(d.html() + e);
          });
          d.html(d.html() + ")");
        });
      }
    }

    /**
     * Extracts the text to put in the tag from the tag object
     * @function tagDataToTagText
     * @param {Object} object
     * @returns {object}
     * @memberof multitag
     * @property
     */
    function tagDataToTagText(object) {
      return object;
    }
    /**
     * Extracts the text to put in the badge from the tag object
     * @function tagDataToBadgeText
     * @param {Object} object
     * @returns {object}
     * @memberof multitag
     * @property
     */
    function tagDataToBadgeText(object) {
      return object;
    }

    /*------------------------------------------------------------------------*
     *                                                                         *
     *                           GETTERS AND SETTERS                           *
     *                                                                         *
     *-------------------------------------------------------------------------*/
    // configurable variables getters and setters
    /**
     * Gets or sets the class associated with all tag elements
     * (see {@link multitag#tagClass})
     * @function tagClass
     * @param {string} [_=none]
     * @returns {multitag | string}
     * @memberof multitag
     * @property
     */
    multitag.tagClass = function (_) {
      return arguments.length ? ((tagClass = _), multitag) : tagClass;
    };
    /**
     * Gets or sets the class associated with all suggestion elements
     * (see {@link multitag#suggestionClass})
     * @function suggestionClass
     * @param {string} [_=none]
     * @returns {multitag | string}
     * @memberof multitag
     * @property
     */
    multitag.suggestionClass = function (_) {
      return arguments.length
        ? ((suggestionClass = _), multitag)
        : suggestionClass;
    };

    /**
     * Gets or sets the id to use for the hiddenInputArea
     * (see {@link multitag#hiddenInputArea})
     * @function hiddenInputArea
     * @param {string} [_=none] id of the hiddenInputArea
     * @returns {multitag | string}
     * @memberof multitag
     * @property
     */
    multitag.hiddenInputArea = function (_) {
      return arguments.length
        ? ((hiddenInputArea = toId(_)), multitag)
        : hiddenInputArea;
    };
    /**
     * Gets or sets the id to use for the typeaheadInputArea
     * (see {@link multitag#typeaheadInputArea})
     * @function typeaheadInputArea
     * @param {string} [_=none] id of the typeaheadInputArea
     * @returns {multitag | string}
     * @memberof multitag
     * @property
     */
    multitag.typeaheadInputArea = function (_) {
      return arguments.length
        ? ((typeaheadInputArea = toId(_)), multitag)
        : typeaheadInputArea;
    };
    /**
     * Gets or sets the id to use for the typeaheadInputSuggestionList
     * (see {@link multitag#typeaheadInputSuggestionList})
     * @function typeaheadInputSuggestionList
     * @param {string} [_=none] id of the typeaheadInputSuggestionList
     * @returns {multitag | string}
     * @memberof multitag
     * @property
     */
    multitag.typeaheadInputSuggestionList = function (_) {
      return arguments.length
        ? ((typeaheadInputSuggestionList = toId(_)), multitag)
        : typeaheadInputSuggestionList;
    };
    /**
     * Gets or sets the id to use for the typeaheadInputSuggestionList
     * (see {@link multitag#taggedList})
     * @function taggedList
     * @param {string} [_=none] id of the taggedList
     * @returns {multitag | string}
     * @memberof multitag
     * @property
     */
    multitag.taggedList = function (_) {
      return arguments.length ? ((taggedList = toId(_)), multitag) : taggedList;
    };

    /**
     * Gets or sets the maxNumberOfTaggedItems that can be entered via this instance
     * (see {@link multitag#maxNumberOfTaggedItems})
     * @function maxNumberOfTaggedItems
     * @param {number} [_=none] the maxNumberOfTaggedItems
     * @returns {multitag | number}
     * @memberof multitag
     * @property
     */
    multitag.maxNumberOfTaggedItems = function (_) {
      return arguments.length
        ? ((maxNumberOfTaggedItems = _), multitag)
        : maxNumberOfTaggedItems;
    };
    /**
     * Gets or sets the maxSuggestions that will be shown when the user types something
     * (see {@link multitag#maxSuggestions})
     * @function maxSuggestions
     * @param {number} [_=none] the maxSuggestions
     * @returns {multitag | number}
     * @memberof multitag
     * @property
     */
    multitag.maxSuggestions = function (_) {
      return arguments.length
        ? ((maxSuggestions = _), multitag)
        : maxSuggestions;
    };
    /**
     * Gets or sets the confirmInputKeys codes that trigger a confirmation of a suggestion
     * (see {@link multitag#confirmInputKeys})
     * @function confirmInputKeys
     * @param {number[]} [_=none] the confirmInputKeys (e.g. enter key) but numerical code
     * @returns {multitag | number}
     * @memberof multitag
     * @property
     */
    multitag.confirmInputKeys = function (_) {
      return arguments.length
        ? ((confirmInputKeys = _), multitag)
        : confirmInputKeys;
    };
    /**
     * Gets or sets the suggestionMovementKeys that move the highlighted suggestion to the previous or next one
     * (see {@link multitag#suggestionMovementKeys})
     * @function suggestionMovementKeys
     * @param {number[]} [_=none] the suggestionMovementKeys (e.g. up arrow, down arrow, left arrow, right arrow) but numerical code
     * @returns {multitag | number}
     * @memberof multitag
     * @property
     */
    multitag.suggestionMovementKeys = function (_) {
      return arguments.length
        ? ((suggestionMovementKeys = _), multitag)
        : suggestionMovementKeys;
    };
    /**
     * Gets or sets the backwardsDeleteKeys that delete the proceeding tag if nothing is currently in the typeaheadInputArea
     * (see {@link multitag#backwardsDeleteKeys})
     * @function backwardsDeleteKeys
     * @param {number[]} [_=none] the backwardsDeleteKeys (e.g. delete, backspace) but numerical code
     * @returns {multitag | number}
     * @memberof multitag
     * @property
     */
    multitag.backwardsDeleteKeys = function (_) {
      return arguments.length
        ? ((backwardsDeleteKeys = _), multitag)
        : backwardsDeleteKeys;
    };

    /**
     * Gets or sets the bloodHound (twitter-typeahead Bloodhound instance)
     * (see {@link multitag#bloodHound})
     * @function bloodHound
     * @param {Bloodhound} [_=none] the bloodHound
     * @returns {multitag | number}
     * @memberof multitag
     * @property
     */
    multitag.bloodHound = function (_) {
      return arguments.length ? ((bloodHound = _), multitag) : bloodHound;
    };

    /**
     * Gets or sets the id to use for the alertArea
     * (see {@link multitag#alertArea})
     * @function alertArea
     * @param {string} [_=none] id of the alertArea
     * @returns {multitag | string}
     * @memberof multitag
     * @property
     */
    multitag.alertArea = function (_) {
      return arguments.length ? ((alertArea = toId(_)), multitag) : alertArea;
    };
    /**
     * Gets or sets the id to use for the pseudoInputArea
     * (see {@link multitag#pseudoInputArea})
     * @function pseudoInputArea
     * @param {string} [_=none] id of the pseudoInputArea
     * @returns {multitag | string}
     * @memberof multitag
     * @property
     */
    multitag.pseudoInputArea = function (_) {
      return arguments.length
        ? ((pseudoInputArea = toId(_)), multitag)
        : pseudoInputArea;
    };
    /**
     * Gets or sets the id to use for the queryDescription
     * (see {@link multitag#queryDescription})
     * @function queryDescription
     * @param {string} [_=none] id of the queryDescription
     * @returns {multitag | string}
     * @memberof multitag
     * @property
     */
    multitag.queryDescription = function (_) {
      return arguments.length
        ? ((queryDescription = toId(_)), multitag)
        : queryDescription;
    };

    /**
     * Gets or sets the namespace for this multitag instance
     * (see {@link multitag#namespace})
     * @function namespace
     * @param {string} [_=none]
     * @returns {multitag | string}
     * @memberof multitag
     * @property
     */
    multitag.namespace = function (_) {
      return arguments.length ? ((namespace = _), multitag) : namespace;
    };
    /**
     * Gets or sets the debug flag
     * (see {@link multitag#debug})
     * @function debug
     * @param {boolean} [_=none]
     * @returns {multitag | boolean}
     * @memberof multitag
     * @property
     */
    multitag.debug = function (_) {
      return arguments.length ? ((debug = _), multitag) : debug;
    };
    /**
     * Gets or sets the asyncQ flag for whether bloodhound should be called asynchronosly
     * (see {@link multitag#asyncQ})
     * @function asyncQ
     * @param {boolean} [_=none]
     * @returns {multitag | boolean}
     * @memberof multitag
     * @property
     */
    multitag.asyncQ = function (_) {
      return arguments.length ? ((asyncQ = _), multitag) : asyncQ;
    };
    /**
     * Gets or sets the badgeQ flag for whether to show a badge if tags have a class
     * (see {@link multitag#badgeQ})
     * @function badgeQ
     * @param {boolean} [_=none]
     * @returns {multitag | boolean}
     * @memberof multitag
     * @property
     */
    multitag.badgeQ = function (_) {
      return arguments.length ? ((badgeQ = _), multitag) : badgeQ;
    };
    /**
     * Gets or sets the hiddenInputDelim for how to seperate tags in the hiddenInputArea
     * (see {@link multitag#hiddenInputDelim})
     * @function hiddenInputDelim
     * @param {string} [_=none]
     * @returns {multitag | hiddenInputDelim}
     * @memberof multitag
     * @property
     */
    multitag.hiddenInputDelim = function (_) {
      return arguments.length
        ? ((hiddenInputDelim = _), multitag)
        : hiddenInputDelim;
    };

    // getters only
    /**
     * numeric code for enter key
     * @member enterKey
     * @returns {number}
     * @memberof multitag
     */
    multitag.enterKey = enterKey;
    /**
     * numeric code for comma key
     * @member commaKey
     * @returns {number}
     * @memberof multitag
     */
    multitag.commaKey = commaKey;
    /**
     * numeric code for left arrow key
     * @member leftArrow
     * @returns {number}
     * @memberof multitag
     */
    multitag.leftArrow = leftArrow;
    /**
     * numeric code for up arrow key
     * @member upArrow
     * @returns {number}
     * @memberof multitag
     */
    multitag.upArrow = upArrow;
    /**
     * numeric code for right arrow key
     * @member rightArrow
     * @returns {number}
     * @memberof multitag
     */
    multitag.rightArrow = rightArrow;
    /**
     * numeric code for down arrow key
     * @member downArrow
     * @returns {number}
     * @memberof multitag
     */
    multitag.downArrow = downArrow;
    /**
     * numeric code for back arrow key
     * @member backspace
     * @returns {number}
     * @memberof multitag
     */
    multitag.backspace = backspace;
    /**
     * numeric code for delete arrow key
     * @member deleteKey
     * @returns {number}
     * @memberof multitag
     */
    multitag.deleteKey = deleteKey;

    multitag.removeTag = removeTag;
    multitag.makeTag = makeTag;
    multitag.clearSuggestions = clearSuggestions;
    multitag.getSuggestionsFromSuggestionElements = getSuggestionsFromSuggestionElements;
    multitag.getTagsFromTaggedElements = getTagsFromTaggedElements;
    multitag.getSuggestionsContainerSelection = getSuggestionsContainerSelection;
    multitag.getSuggestionsSelection = getSuggestionsSelection;
    multitag.getTagsContainerSelection = getTagsContainerSelection;
    multitag.getTagsSelection = getTagsSelection;
    multitag.makeTypeaheadAlert = makeTypeaheadAlert;
    multitag.syncTagsAndHiddenForm = syncTagsAndHiddenForm;

    multitag.getTagsFromTaggedElements = getTagsFromTaggedElements;
    multitag.hasQ = hasQ;
    multitag.scrollBarToBottom = scrollBarToBottom;
    multitag.hypenate = hypenate;

    // overwrite-able functions
    /**
     * Gets or sets the tagToHidden function
     * @function tagToHidden
     * @param {function} [_=none]
     * @returns {multitag | function}
     * @memberof multitag
     * @property
     */
    multitag.tagToHidden = function (_) {
      return arguments.length ? ((tagToHidden = _), multitag) : tagToHidden;
    };
    /**
     * Gets or sets the makeTagElement function
     * @function makeTagElement
     * @param {function} [_=none]
     * @returns {multitag | function}
     * @memberof multitag
     * @property
     */
    multitag.makeTagElement = function (_) {
      return arguments.length
        ? ((makeTagElement = _), multitag)
        : makeTagElement;
    };
    /**
     * Gets or sets the removeTagElement function
     * @function removeTagElement
     * @param {function} [_=none]
     * @returns {multitag | function}
     * @memberof multitag
     * @property
     */
    multitag.removeTagElement = function (_) {
      return arguments.length
        ? ((removeTagElement = _), multitag)
        : removeTagElement;
    };
    /**
     * Gets or sets the pasteEventTextParser function
     * @function pasteEventTextParser
     * @param {function} [_=none]
     * @returns {multitag | function}
     * @memberof multitag
     * @property
     */
    multitag.pasteEventTextParser = function (_) {
      return arguments.length
        ? ((pasteEventTextParser = _), multitag)
        : pasteEventTextParser;
    };
    /**
     * Gets or sets the parsePseudoInputAreaText function
     * @function parsePseudoInputAreaText
     * @param {function} [_=none]
     * @returns {multitag | function}
     * @memberof multitag
     * @property
     */
    multitag.parsePseudoInputAreaText = function (_) {
      return arguments.length
        ? ((parsePseudoInputAreaText = _), multitag)
        : parsePseudoInputAreaText;
    };
    /**
     * Gets or sets the tagDataToTagText function
     * @function tagDataToTagText
     * @param {function} [_=none]
     * @returns {multitag | function}
     * @memberof multitag
     * @property
     */
    multitag.tagDataToTagText = function (_) {
      return arguments.length
        ? ((tagDataToTagText = _), multitag)
        : tagDataToTagText;
    };
    /**
     * Gets or sets the tagDataToBadgeText function
     * @function tagDataToBadgeText
     * @param {function} [_=none]
     * @returns {multitag | function}
     * @memberof multitag
     * @property
     */
    multitag.tagDataToBadgeText = function (_) {
      return arguments.length
        ? ((tagDataToBadgeText = _), multitag)
        : tagDataToBadgeText;
    };

    multitag.submitErrorHandling = function (_) {
      return arguments.length
        ? ((submitErrorHandling = _), multitag)
        : submitErrorHandling;
    };
    multitag.submitHiddenForm = function (_) {
      return arguments.length
        ? ((submitHiddenForm = _), multitag)
        : submitHiddenForm;
    };

    function submitErrorHandling(tags) {
      if (debug) {
        console.log("submit error handling with tags: ", tags);
      }
      if (!tags.length) {
        makeTypeaheadAlert("Form Error", "no tags", "danger");
        return false;
      }

      return true;
    }

    function submitHiddenForm(validQ) {
      if (debug) {
        console.log("submit form with validQ:", validQ);
      }
      var type = !validQ ? "danger" : "success";
      var formValue = d3.select(hiddenInputArea).property("value");
      if (debug) {
        console.log(formValue);
      }

      //d3.select("input").node().parentNode.submit()

      makeTypeaheadAlert("'Submit'", formValue, type);
    }

    function objectQ(obj) {
      return obj instanceof Object;
    }
    return multitag;
  }

  /**
   * Generates the elements needed for an inline typeahead form
   * with the except of the form itself (makes it easier to add csrf token with templating language)
   * @param {string} id of container in which to generate the elements
   * @param {string} namespace to prepend to all elements
   * @returns {d3.selection} of the passed containing element (e.g. d3.select(id) ) after
   * all elements have been populated.
   * @example
   * // index.html
   * ...
   * <div id="my-div"></div>
   * ...
   * // script tag in index.html or js file
   * bsTag.setupInlineMultitagHtml("my-div", "mtag")
   *
   * //results in html:
   * <div id="my-div">
   *   <div class="dsm-mt-inline-form w-100" id="mtag-pseudo-form-element">
   *     <div class="dsm-mt-pseudo-input-element" id="mtag-pseudo-input">
   *       <ul class="dsm-mt-tag-area" id="mtag-tag-list">
   *         <input class="dsm-mt-typeahead-input-area" id="mtag-typeahead-area" type="text">
   *       </ul>
   *     </div>
   *     <button class="dsm-mt-btn-submit" id="mtag-pseudo-submit-button" type="button" name="button">
   *       <i class="fa fa-search" id="mtag-pseudo-submit-button-icon"></i>
   *     </button>
   *   </div>
   * </div>
   */

  function setupInlineMultitagHtml(id, namespace) {
    var id = !id.includes("#") ? "#" + id : id;

    var passedDiv = d3.select(id);

    var // alertsDiv,
      pFormElement,
      // form
      // input
      pInputElement,
      tagList,
      pInput,
      pSubmitButton,
      pSubmitIcon,
      suggestionArea;

    pFormElement = (passedDiv.select("div.dsm-mt-inline-form").empty()
      ? passedDiv.append("div")
      : passedDiv.select("div")
    )
      .attr("class", "dsm-mt-inline-form w-100")
      .attr("id", namespace + "-pseudo-form-element");

    pInputElement = (pFormElement
      .select("div.dsm-mt-pseudo-input-element")
      .empty()
      ? pFormElement.append("div")
      : pFormElement.select("div")
    )
      .attr("class", "dsm-mt-pseudo-input-element")
      .attr("id", namespace + "-pseudo-input");

    tagList = (pInputElement.select("ul.dsm-mt-tag-area").empty()
      ? pInputElement.append("ul")
      : pInputElement.select("ul")
    )
      .attr("class", "dsm-mt-tag-area")
      .attr("id", namespace + "-tag-list");

    pInput = (tagList.select("input.dsm-mt-typeahead-input-area").empty()
      ? tagList.append("input")
      : tagList.select("input")
    )
      .attr("class", "dsm-mt-typeahead-input-area")
      .attr("id", namespace + "-typeahead-area")
      .attr("type", "text");

    pSubmitButton = (pFormElement.select("button.dsm-mt-btn-submit").empty()
      ? pFormElement.append("button")
      : pFormElement.select("button")
    )
      .attr("class", "dsm-mt-btn-submit")
      .attr("id", namespace + "-pseudo-submit-button")
      .attr("type", "button")
      .attr("name", "button");

    pSubmitIcon = (pSubmitButton.select("i").empty()
      ? pSubmitButton.append("i")
      : pSubmitButton.select("i")
    )
      .attr("class", "fa fa-search")
      .attr("id", namespace + "-pseudo-submit-button-icon");

    suggestionArea = (pFormElement
      .select("div.dsm-mt-typeahead-suggestion-area")
      .empty()
      ? pFormElement.append("div")
      : pFormElement.select("div")
    )
      .attr("class", "dsm-mt-typeahead-suggestion-area")
      .attr("id", namespace + "-typeahead-suggestion-area");

    return passedDiv;
  }

  // // Import a logger for easier debugging.

  exports.multitag = multitag;
  exports.populateTags = populateTags;
  exports.setupInlineMultitagHtml = setupInlineMultitagHtml;

  //bsTag = {};
  //bsTag.multitag = multitag;
  //bsTag.populateTags = populateTags;
  //bsTag.setupInlineMultitagHtml = setupInlineMultitagHtml;

  //return bsTag;

  //}());
  Object.defineProperty(exports, "__esModule", { value: true });
});
