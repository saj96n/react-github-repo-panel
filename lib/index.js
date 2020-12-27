"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RepoCard = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _svglib = require("./svglib.js");

var _colors = require("./colors.js");

require("./githubcard.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var RepoCard = /*#__PURE__*/function (_React$Component) {
  _inherits(RepoCard, _React$Component);

  var _super = _createSuper(RepoCard);

  function RepoCard(props) {
    var _this;

    _classCallCheck(this, RepoCard);

    _this = _super.call(this, props);
    _this.state = {
      avatar_url: undefined,
      description: undefined,
      forks_count: undefined,
      language: undefined,
      license: undefined,
      name: undefined,
      stars_count: undefined,
      pushed_at: undefined,
      ready: false,
      watchers_count: undefined
    };
    return _this;
  }

  _createClass(RepoCard, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch("https://api.github.com/repos/" + this.props.username + "/" + this.props.reponame).then(function (res) {
        return res.json();
      }).then(function (data) {
        _this2.setState({
          avatar_url: data.owner.avatar_url,
          description: data.description,
          forks_count: _this2.solveCount(data.forks_count),
          language: data.language,
          license: data.license.spdx_id,
          name: data.name,
          stars_count: _this2.solveCount(data.stargazers_count),
          pushed_at: data.pushed_at.slice(2, 10),
          ready: true,
          watchers_count: _this2.solveCount(data.watchers_count)
        });
      })["catch"](function (error) {
        return console.error(error);
      });
    }
  }, {
    key: "solveCount",
    value: function solveCount(count) {
      var countNumber = parseInt(count);

      if (countNumber > 1000000) {
        countNumber = Math.round(countNumber / 1000000) + 'M';
      } else if (countNumber > 1000) {
        countNumber = Math.round(countNumber / 1000) + "K";
      }

      return countNumber;
    }
  }, {
    key: "renderCardContent",
    value: function renderCardContent() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "githubCardContent"
      }, /*#__PURE__*/_react["default"].createElement("p", {
        style: {
          WebkitLineClamp: this.props.descriptionLine
        }
      }, this.state.description));
    }
  }, {
    key: "renderCardFooter",
    value: function renderCardFooter() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "githubCardFooter"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "githubCardFooterStatus"
      }, _svglib.watchSVG, " Watch ", /*#__PURE__*/_react["default"].createElement("strong", null, this.state.watchers_count)), /*#__PURE__*/_react["default"].createElement("span", {
        className: "githubCardFooterStatus"
      }, _svglib.starSVG, " Stars ", /*#__PURE__*/_react["default"].createElement("strong", null, this.state.stars_count)), /*#__PURE__*/_react["default"].createElement("span", {
        className: "githubCardFooterStatus"
      }, _svglib.forkSVG, " Forks ", /*#__PURE__*/_react["default"].createElement("strong", null, this.state.forks_count)), /*#__PURE__*/_react["default"].createElement("span", {
        className: "githubCardFooterUpdate"
      }, _svglib.updateSVG, " ", this.state.pushed_at));
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.ready === false) {
        return /*#__PURE__*/_react["default"].createElement("div", null);
      }

      var licenseSpan = this.state.license === undefined || this.state.license === "NOASSERTION" ? undefined : /*#__PURE__*/_react["default"].createElement("span", {
        className: "githubCardHeaderStatus"
      }, _svglib.licenseSVG, /*#__PURE__*/_react["default"].createElement("strong", null, this.state.license));
      var languageColor = this.state.language === undefined ? undefined : _colors.githubColors[this.state.language];
      var languageSpan = this.state.language === undefined ? undefined : /*#__PURE__*/_react["default"].createElement("span", {
        className: "githubCardHeaderStatus"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        style: {
          backgroundColor: languageColor
        }
      }), /*#__PURE__*/_react["default"].createElement("strong", null, this.state.language));
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "githubCard",
        style: {
          margin: this.props.center ? "0 auto" : ""
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "githubCardHeader"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        className: "githubCardAvatar",
        href: "https://github.com/" + this.props.username,
        target: "_blank"
      }, /*#__PURE__*/_react["default"].createElement("img", {
        src: this.state.avatar_url,
        style: {
          borderRadius: this.props.squareAvatar ? "5px" : "50%"
        }
      })), /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement("a", {
        className: "githubCardRepoName",
        href: "https://github.com/" + this.props.username + "/" + this.props.reponame,
        target: "_blank"
      }, /*#__PURE__*/_react["default"].createElement("strong", null, this.props.reponame)), languageSpan, licenseSpan, /*#__PURE__*/_react["default"].createElement("a", {
        className: "githubCardBottonStar",
        href: "https://github.com/" + this.props.username + "/" + this.props.reponame,
        target: "_blank"
      }, "Star ", _svglib.githubSVG)), /*#__PURE__*/_react["default"].createElement("p", null, "Created by\xA0", /*#__PURE__*/_react["default"].createElement("a", {
        className: "githubCardCreater",
        href: "https://github.com/" + this.props.username,
        target: "_blank"
      }, this.props.username))), this.renderCardContent(), this.renderCardFooter());
    }
  }]);

  return RepoCard;
}(_react["default"].Component);

exports.RepoCard = RepoCard;
RepoCard.propTypes = {
  username: _propTypes["default"].string.isRequired,
  reponame: _propTypes["default"].string.isRequired,
  center: _propTypes["default"].bool,
  squareAvatar: _propTypes["default"].bool,
  descriptionLine: _propTypes["default"].number
};
RepoCard.defaultProps = {
  username: "",
  reponame: "",
  center: false,
  squareAvatar: false,
  descriptionLine: 2
};