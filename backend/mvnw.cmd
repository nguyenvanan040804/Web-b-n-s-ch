@echo off
rem Maven wrapper fallback script
setlocal EnableDelayedExpansion
set MAVEN_PROJECTBASEDIR=%~dp0
set MAVEN_WRAPPER_DIR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper
if defined JAVA_HOME (
  set "JAVA_HOME_STRIPPED=%JAVA_HOME:"=%"
  set "JAVA_CMD=!JAVA_HOME_STRIPPED!\bin\java.exe"
) else (
  set "JAVA_CMD=java.exe"
)
set "MAVEN_DISTS=%USERPROFILE%\.m2\wrapper\dists\apache-maven-3.9.14-bin"
set "MAVEN_CMD="
if exist "%MAVEN_DISTS%" (
  for /f "delims=" %%D in ('dir /b /ad "%MAVEN_DISTS%" 2^>nul') do (
    set "MAVEN_CANDIDATE=%%D"
    goto :foundMavenDist
  )
)
goto :runWrapperJar
:foundMavenDist
set "MAVEN_CMD=%MAVEN_DISTS%\%MAVEN_CANDIDATE%\apache-maven-3.9.14\bin\mvn.cmd"
if exist "%MAVEN_CMD%" (
  call "%MAVEN_CMD%" %*
  goto :eof
)
:runWrapperJar
"%JAVA_CMD%" -cp "%MAVEN_WRAPPER_DIR%\maven-wrapper.jar" org.apache.maven.wrapper.MavenWrapperMain %*

