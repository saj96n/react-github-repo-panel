"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepoCard = RepoCard;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _svglib = require("./svglib.js");

var _colors = require("./colors.js");

require("./githubcard.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function solveCount(count) {
  var countNumber = parseInt(count);

  if (countNumber > 1000000) {
    countNumber = Math.round(countNumber / 1000000) + "M";
  } else if (countNumber > 1000) {
    countNumber = Math.round(countNumber / 1000) + "K";
  }

  return countNumber;
}

function RepoCard(_ref) {
  var _repo$primaryLanguage, _repo$watchers;

  var _ref$repo = _ref.repo,
      repo = _ref$repo === void 0 ? {} : _ref$repo,
      _ref$center = _ref.center,
      center = _ref$center === void 0 ? false : _ref$center,
      _ref$squareAvatar = _ref.squareAvatar,
      squareAvatar = _ref$squareAvatar === void 0 ? false : _ref$squareAvatar,
      _ref$descriptionLine = _ref.descriptionLine,
      descriptionLine = _ref$descriptionLine === void 0 ? 2 : _ref$descriptionLine,
      _ref$showLanguage = _ref.showLanguage,
      showLanguage = _ref$showLanguage === void 0 ? true : _ref$showLanguage,
      _ref$showLicense = _ref.showLicense,
      showLicense = _ref$showLicense === void 0 ? true : _ref$showLicense;
  //   const [test, setTest] = useState(null);
  var avatar_url = repo.owner.avatarUrl;
  var description = repo.description;
  var forks_count = repo.forks.totalCount;
  var language = (_repo$primaryLanguage = repo.primaryLanguage) === null || _repo$primaryLanguage === void 0 ? void 0 : _repo$primaryLanguage.name;
  var license = repo.licenseInfo === null ? undefined : repo.licenseInfo.spdxId;
  var repoName = repo.name;
  var stars_count = solveCount(repo.stargazerCount);
  var pushed_at = repo.pushedAt.slice(2, 10);
  var watchers_count = solveCount((_repo$watchers = repo.watchers) === null || _repo$watchers === void 0 ? void 0 : _repo$watchers.totalCount);
  var username = repo.owner.login;
  var renderCardHeader = (0, _react.useCallback)(function () {
    var userLink = "https://github.com/" + username;
    var repoLink = "https://github.com/" + username + "/" + repoName;
    var renderLanguage = showLanguage && language !== undefined && language !== null;
    var languageSpan = renderLanguage ? /*#__PURE__*/_react["default"].createElement("span", {
      key: "1",
      className: "githubCardHeaderStatus"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      style: {
        backgroundColor: _colors.githubColors[language]
      }
    }), /*#__PURE__*/_react["default"].createElement("strong", null, language)) : undefined;
    var renderLicense = showLicense && license !== undefined && license !== "NOASSERTION";
    var licenseSpan = renderLicense ? /*#__PURE__*/_react["default"].createElement("span", {
      key: "2",
      className: "githubCardHeaderStatus"
    }, _svglib.licenseSVG, /*#__PURE__*/_react["default"].createElement("strong", null, license)) : undefined;
    var secondLine = renderLanguage && renderLicense && repoName.length > 15 || (renderLanguage || renderLicense) && repoName.length > 20 ? /*#__PURE__*/_react["default"].createElement("p", {
      className: "githubCardP",
      style: {
        marginTop: "-7px",
        transform: "translateX(-3px)"
      }
    }, languageSpan, licenseSpan) : undefined;
    var firstLineChildren = [/*#__PURE__*/_react["default"].createElement("a", {
      className: "githubCardRepoName",
      key: "0",
      href: repoLink,
      target: "_blank"
    }, /*#__PURE__*/_react["default"].createElement("strong", null, repoName))];

    if (secondLine === undefined) {
      firstLineChildren.push(languageSpan);
      firstLineChildren.push(licenseSpan);
    }

    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "githubCardHeader"
    }, /*#__PURE__*/_react["default"].createElement("a", {
      className: "githubCardAvatar",
      style: {
        marginTop: secondLine ? "7px" : ""
      },
      href: userLink,
      target: "_blank"
    }, /*#__PURE__*/_react["default"].createElement("img", {
      src: avatar_url,
      style: {
        borderRadius: squareAvatar ? "5px" : "50%"
      }
    })), /*#__PURE__*/_react["default"].createElement("a", {
      className: "githubCardBottonStar",
      href: repoLink,
      target: "_blank"
    }, "Star ", _svglib.githubSVG), /*#__PURE__*/_react["default"].createElement("p", {
      className: "githubCardP"
    }, firstLineChildren), secondLine, /*#__PURE__*/_react["default"].createElement("p", {
      className: "githubCardP"
    }, "Created by\xA0", /*#__PURE__*/_react["default"].createElement("a", {
      className: "githubCardCreator",
      href: userLink,
      target: "_blank"
    }, username)));
  }, [username, repoName, avatar_url, license, language]);
  var renderCardContent = (0, _react.useCallback)(function () {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "githubCardContent"
    }, /*#__PURE__*/_react["default"].createElement("p", {
      className: "githubCardContentP",
      style: {
        WebkitLineClamp: descriptionLine
      }
    }, description));
  }, [description]);
  var renderCardFooter = (0, _react.useCallback)(function () {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "githubCardFooter"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "githubCardFooterStatus"
    }, _svglib.watchSVG, " Watch ", /*#__PURE__*/_react["default"].createElement("strong", null, watchers_count)), /*#__PURE__*/_react["default"].createElement("span", {
      className: "githubCardFooterStatus"
    }, _svglib.starSVG, " Stars ", /*#__PURE__*/_react["default"].createElement("strong", null, stars_count)), /*#__PURE__*/_react["default"].createElement("span", {
      className: "githubCardFooterStatus"
    }, _svglib.forkSVG, " Forks ", /*#__PURE__*/_react["default"].createElement("strong", null, forks_count)), /*#__PURE__*/_react["default"].createElement("span", {
      className: "githubCardFooterUpdate"
    }, _svglib.updateSVG, " ", pushed_at));
  }, [watchers_count, stars_count, pushed_at, forks_count]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "githubCard",
    style: {
      margin: center ? "0 auto" : ""
    }
  }, renderCardHeader(), renderCardContent(), renderCardFooter());
}

RepoCard.propTypes = {
  repo: _propTypes["default"].object.isRequired,
  center: _propTypes["default"].bool,
  squareAvatar: _propTypes["default"].bool,
  descriptionLine: _propTypes["default"].number,
  showLanguage: _propTypes["default"].bool,
  showLicense: _propTypes["default"].bool
};