import { useRef } from 'react';

const AC = ({ id, listSort, placeholder }: { id: string; listSort: String[]; placeholder: string }) => {
  const sArea: any = useRef(null);
  id += String.fromCharCode(Math.ceil(Math.random() * 20) + 64);
  /*
  const dogs = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.whitespace,
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    local: listSort,
    templates: {
      empty: ['<div>Unable to find an entry of that name</div>'],
    },
  });

  const mtag = bsTag
    .multitag()
    .hiddenInputArea(`#${id}`)
    .taggedList(`#${id}-tag-list`)
    .typeaheadInputArea(`#${id}-typeahead-area`)
    .typeaheadInputSuggestionList(`#${id}-typeahead-suggestions`)
    .pseudoInputArea(`#${id}-psuedo-input`)
    .bloodHound(dogs)
    .namespace('mtag');
  */
  const mtag = () => {};
  if (listSort) mtag();

  sArea.parentNode.removeChild(sArea);

  return (
    <>
      <div className="c-ac-width dsm-mt-psuedo-input-element" id={id + '-psuedo-input'}>
        <ul id={id + '-tag-list'} className="soft-border dsm-mt-tag-area">
          <input
            type="text"
            id={id + '-typeahead-area'}
            className="dsm-mt-typeahead-input-area"
            placeholder={placeholder}
          />
        </ul>
      </div>
      <div className="dsm-mt-typeahead-suggestion-area" id={id + '-typeahead-suggestions'} ref={sArea} />
      <style jsx global lang="scss">{`
        @import './style/global/index';
        .c-ac-width {
          min-width: 40%;
        }
        .not-selectable {
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .tag {
          padding: 3px 11px 2px 16px;
          background-color: #00bbe0;
          color: #ffffff;
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          border-radius: 50px;
          border: 1px #00bbe0 solid;
          margin-bottom: 2px;
          margin-right: 5px;
          p,
          span {
            margin: 0;
            padding: 0;
            font-size: 12px;
            font-weight: 500;
            &.active {
              padding-left: 5px;
              margin-left: 5px;
              border-left: 1px solid #fff;
            }
          }
          button {
            color: #000000;
            opacity: 0.75;
            text-decoration: none;
            padding: 0;
            padding-left: 5px;
            border-style: none;
            border: 0;
            font-size: 1.2rem;
            font-weight: 800;
            line-height: 1;
            text-transform: none;
            overflow: visible;
            margin: none;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            background-color: transparent;
            vertical-align: middle;
            &:hover {
              color: #fff;
              opacity: 1;
            }
          }
        }

        .suggestion {
          z-index: 1;
          &.list-group-item.active {
            background-color: $primary;
            border-color: #333;
            .tag {
              border: 1px solid;
              border-color: inherit;
            }
          }
        }

        .dsm-mt-pseudo-input-element {
          margin-bottom: 5px;
          &:focus {
            border: 2px solid #0097cf;
          }
        }

        .dsm-mt-tag-area {
          padding-left: 16px;
          padding-left: 1rem;
          max-height: 200px;
          overflow-y: auto;
          margin-bottom: 0;
          &.disabled {
            background-color: #9fa4aa;
          }
        }

        .dsm-mt-typeahead-input-area {
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          width: 200px;
          padding: 0;
          overflow: auto;
          background-color: transparent;
          border: none;
          outline: none;
          -webkit-box-shadow: none;
          box-shadow: none;
          height: 30px;
        }

        .dsm-mt-form-element {
          border: 2px dashed #ccc;
          padding: 1em;
          margin: 1em 0;
        }

        .dsm-mt-typeahead-suggestion-area {
          position: absolute;
          max-height: 400px;
          overflow-y: auto;
          z-index: 2000;
        }

        .soft-border {
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding-top: 0px;
        }

        .hidden-form {
          display: none;
        }

        .dsm-mt-inline-form {
          display: -webkit-inline-box;
          display: -ms-inline-flexbox;
          display: inline-flex;
          width: 100%;
          --bc: #333;
          --bsw: 1px;
          --bgc: #fff;
          input {
            margin-top: 0;
            padding: 0;
          }
          .dsm-mt-pseudo-input-element {
            width: 100%;
            background-color: var(--bgc);
            margin-bottom: 0;
            border-radius: 10px 0 0 10px;
            border: var(--bsw) solid var(--bc);
          }
          .dsm-mt-btn-submit {
            display: inline-block !important;
            cursor: pointer !important;
            padding: 0 10px !important;
            color: #fff !important;
            background-color: #007bff !important;
            text-align: center !important;
            vertical-align: middle !important;
            border-radius: 0 10px 10px 0 !important;
            border: var(--bsw) solid !important;
            border-color: var(--bc) !important;
            border-left: 0 !important;
            background-color: rgba(0, 123, 255, 0.96078) !important;
            -webkit-transition: all 0.3 ease;
            transition: all 0.3 ease;
            &:hover {
              opacity: 0.75 !important;
              -webkit-transition: all 0.5 ease !important;
              transition: all 0.5 ease !important;
            }
          }
          .dsm-mt-tag-area {
            height: auto;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            width: 100% !important;
          }
          .tag,
          input {
            margin-top: 5px;
            display: -webkit-inline-box;
            display: -ms-inline-flexbox;
            display: inline-flex;
            white-space: nowrap;
          }
        }
      `}</style>
    </>
  );
};

export default AC;
