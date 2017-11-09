Import-Module "D:\home\site\wwwroot\modules\SharePointPnPPowerShellOnline.psd1" -Global

#-----------------------------------------------------------------------
# Initialization & Configuration
#-----------------------------------------------------------------------
$CurrentProgressPreference = $ProgressPreference
$ProgressPreference = 'SilentlyContinue'

#-----------------------------------------------------------------------
# Getting the value from the POST Request
#-----------------------------------------------------------------------
$RequestBody = Get-Content $req -Raw | ConvertFrom-Json

#-----------------------------------------------------------------------
# Connecting to the Microsoft Graph
#-----------------------------------------------------------------------
Connect-PnPMicrosoftGraph -AppId $env:AppId -AppSecret $env:AppSecret -AADDomain $env:AADDomain

#-----------------------------------------------------------------------
# Creating a new Unified Group
#-----------------------------------------------------------------------
$group = New-PnPUnifiedGroup -DisplayName $RequestBody.title -Description $RequestBody.description -MailNickName $RequestBody.url -Owners $env:AdminUsername -IsPrivate:$($RequestBody.private) -Force

#-----------------------------------------------------------------------
# Set the ProgressPreference to the saved ProgressPreference
#-----------------------------------------------------------------------
$ProgressPreference = $CurrentProgressPreference 

$Site = @{
    id = $group.GroupId
    title = $group.DisplayName
    description = $group.Description
    email = $group.Mail
    url = "$($env:TenantUrl)/_layouts/15/groupstatus.aspx?id=$($group.GroupId)&target=site"
}

$ResultJson = $Site | ConvertTo-Json -Depth 5
Write-Output $ResultJson
$ResultJson | Out-File -Encoding ASCII -FilePath $res